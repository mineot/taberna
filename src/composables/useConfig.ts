import { ref, type Ref } from 'vue';
import type { AppConfig } from '../types/config';

const config: Ref<AppConfig | null> = ref(null);
const loaded = ref(false);
const error = ref<string | null>(null);
const currentLocale = ref('');

export function useConfig() {
  const loadConfig = async (locale: string) => {
    if (loaded.value && currentLocale.value === locale) {
      return;
    }

    try {
      const res = await fetch(`/config/${locale}.json`);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data: AppConfig = await res.json();

      config.value = data;
      currentLocale.value = locale;
      loaded.value = true;
      error.value = null;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
    }
  };

  return { config, loaded, error, currentLocale, loadConfig };
}
