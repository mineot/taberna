import { ref } from 'vue';
import { marked } from 'marked';

const cache = new Map<string, string>();

export function useMarkdown() {
  const loading = ref(false);

  const fetchMarkdown = async (path: string): Promise<string> => {
    if (cache.has(path)) {
      return cache.get(path)!;
    }

    loading.value = true;

    try {
      const res = await fetch(path);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const ct = res.headers.get('content-type') ?? '';
      if (ct.includes('text/html')) {
        throw new Error('Not found');
      }

      const md = await res.text();
      const html = marked.parse(md) as string;
      cache.set(path, html);
      return html;
    } catch (e) {
      throw e instanceof Error ? e : new Error(String(e));
    } finally {
      loading.value = false;
    }
  };

  return { fetchMarkdown, loading };
}
