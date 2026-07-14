import { ref, type Ref } from 'vue';
import type { AppConfig } from '../types/config';
import { publicPath } from '../utils/paths';

const config: Ref<AppConfig | null> = ref(null);
const loaded = ref(false);
const loading = ref(false);
const error = ref<string | null>(null);
const currentLocale = ref('');
let activeRequest = 0;
let activeController: AbortController | null = null;

export function useConfig() {
  const loadConfig = async (locale: string): Promise<boolean> => {
    if (loaded.value && currentLocale.value === locale) {
      return true;
    }

    const requestId = ++activeRequest;
    activeController?.abort();
    activeController = new AbortController();
    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(publicPath(`config/${locale}.json`), {
        signal: activeController.signal,
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data: AppConfig = await res.json();

      if (requestId !== activeRequest) return false;

      config.value = data;
      currentLocale.value = locale;
      loaded.value = true;
      error.value = null;
      return true;
    } catch (e) {
      if (
        requestId !== activeRequest ||
        (e instanceof DOMException && e.name === 'AbortError')
      ) {
        return false;
      }
      error.value = e instanceof Error ? e.message : 'Unknown error';
      return false;
    } finally {
      if (requestId === activeRequest) {
        loading.value = false;
        activeController = null;
      }
    }
  };

  return { config, loaded, loading, error, currentLocale, loadConfig };
}
