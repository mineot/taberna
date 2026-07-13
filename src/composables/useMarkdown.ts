import DOMPurify from 'dompurify';
import { marked } from 'marked';

const cache = new Map<string, string>();

export function useMarkdown() {
  const fetchMarkdown = async (path: string): Promise<string> => {
    if (cache.has(path)) {
      return cache.get(path)!;
    }

    const res = await fetch(path);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const ct = res.headers.get('content-type') ?? '';

    if (ct.includes('text/html')) {
      throw new Error('Not found');
    }

    const md = await res.text();
    const html = DOMPurify.sanitize(marked.parse(md) as string);
    cache.set(path, html);
    return html;
  };

  return { fetchMarkdown };
}
