import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useErrorStore } from '@/stories/error.store';
import { useLoadingStore } from '@/stories/loading.store';

interface LanguageConfiguration {
  default: string;
  available: string[];
  flags: Record<string, string>;
  names: Record<string, string>;
}

export const useLanguageStore = defineStore('language-store', () => {
  const { setError } = useErrorStore();
  const { startLoading, stopLoading, createToken } = useLoadingStore();
  const language = ref('');

  const initLanguage = async (): Promise<void> => {
    const token = createToken();
    startLoading(token);

    try {
      const loadingJson = await fetch('/config/languages.json');
      const config: LanguageConfiguration = await loadingJson.json();
      const browserLanguage = navigator.language.toLowerCase();

      if (config.available.includes(browserLanguage)) {
        language.value = browserLanguage;
      } else {
        language.value = config.default;
      }

      return;
    } catch (error) {
      console.error(error);

      setError({
        title: 'Language Error',
        status: 500,
        message: 'Could not load language configuration.',
      });
    } finally {
      stopLoading(token);
    }
  };

  return { initLanguage, language };
});
