import { defineStore } from 'pinia';
import { useErrorStore } from '@/stories/error.store';
import { useLoadingStore } from '@/stories/loading.store';
import { computed, ref } from 'vue';

const STORE_KEY = 'tblang';

interface LanguageManifest {
  default: string;
  available: string[];
  flags: Record<string, string>;
  names: Record<string, string>;
}

export const useLanguageStore = defineStore('language-store', () => {
  const { captureError } = useErrorStore();
  const { startLoading, stopLoading } = useLoadingStore();

  const $language = ref<string>('');
  const $manifest = ref<LanguageManifest>({} as LanguageManifest);

  const language = computed<string>(() => $language.value);

  const languageFlag = computed<string>(() => {
    if (!$language.value) {
      return '';
    }

    return $manifest.value.flags[$language.value];
  });

  const languageName = computed<string>(() => {
    if (!$language.value) {
      return '';
    }
    
    return $manifest.value.names[$language.value];
  });

  const detectLanguage = async () => {
    const token = startLoading();

    captureError(
      async () => {
        const storedLanguage = localStorage.getItem(STORE_KEY);
        const navigatorLanguage = navigator.language.toLowerCase();

        if (!storedLanguage) {
          localStorage.setItem(STORE_KEY, navigatorLanguage);
        }

        const response = await fetch('/config/languages.json');
        $manifest.value = (await response.json()) as LanguageManifest;

        const detected = $manifest.value.available.find((lang: string) => {
          return lang === storedLanguage || lang === navigatorLanguage;
        });

        if (detected) {
          $language.value = detected;
        } else {
          $language.value = $manifest.value.default;
        }
      },
      {
        title: 'Error to detect language',
        message:
          'Could not detect language. Please check console to more details.',
        rethrow: true,
      },
    ).finally(() => stopLoading(token));
  };

  return { detectLanguage, language, languageFlag, languageName };
});
