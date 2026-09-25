import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useErrorStore } from '@/stories/error.store';
import { useLoadingStore } from '@/stories/loading.store';
import { computed } from 'vue';

interface LanguageManifest {
  default: string;
  available: string[];
  flags: Record<string, string>;
  names: Record<string, string>;
}

export const useLanguageStore = defineStore('language-store', () => {
  const { setError } = useErrorStore();
  const { startLoading, stopLoading, createToken } = useLoadingStore();
  const language = ref<string>('');
  const languageManifest = ref<LanguageManifest | null>(null);

  const switchLanguage = (lang: string): void => {
    localStorage.setItem('tblang', lang);
    window.location.reload();
  };

  const initLanguage = async (): Promise<void> => {
    const token = createToken();
    startLoading(token);

    try {
      const localLang = localStorage.getItem('tblang');
      const navLang = navigator.language.toLowerCase();
      const loadingJson = await fetch('/config/languages.json');
      languageManifest.value = (await loadingJson.json()) as LanguageManifest;

      const existsLang = languageManifest.value.available.some(
        (lang: string) => {
          return lang === localLang || lang === navLang;
        },
      );

      if (!existsLang) {
        throw new Error('Language not found!');
      }

      if (!localLang) {
        localStorage.setItem('tblang', navLang);
      }

      language.value = localLang ?? navLang;

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

  const languageFlag = computed(() => {
    return languageManifest.value?.flags[language.value];
  });

  const languageName = computed(() => {
    return languageManifest.value?.names[language.value];
  });

  return {
    language,
    languageManifest,
    switchLanguage,
    initLanguage,
    languageFlag,
    languageName,
  };
});
