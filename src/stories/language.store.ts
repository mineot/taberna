import { defineStore } from 'pinia';
import { publicPath } from '@util/paths.util';
import { ref } from 'vue';
import { useLoadingStore } from '@store/loading.store';

export const STORAGE_KEY = 'taberna-lang';

export interface LanguageManifest {
  default: string;
  available: string[];
  flags: Record<string, string>;
  names: Record<string, string>;
}

export async function loadStorage(): Promise<string> {
  try {
    const local = localStorage.getItem(STORAGE_KEY) as string;

    if (!local) {
      return 'nn-nn';
    }

    return local.toLowerCase();
  } catch (err) {
    throw new Error('Failed to load locale storage', { cause: err });
  }
}

export async function updateStorage(locale: string): Promise<void> {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch (err) {
    throw new Error('Failed to update locale storage', { cause: err });
  }
}

export async function loadConfig(): Promise<LanguageManifest> {
  try {
    const path = publicPath('config/languages.json');
    const response = await fetch(path);
    return response.json();
  } catch (err) {
    throw new Error('Failed to load config languages JSON', { cause: err });
  }
}

export async function detectBrowserLanguage(): Promise<string | null> {
  try {
    const rawLocale =
      (navigator.languages && navigator.languages[0]) || navigator.language;

    if (!rawLocale) {
      return null;
    }

    return rawLocale.toLowerCase();
  } catch (err) {
    throw new Error('Failed to detect locale', { cause: err });
  }
}

export const useLanguageStore = defineStore('language-store', () => {
  const locale = ref<string>('');
  const flag = ref<string>('');
  const fullName = ref<string>('');
  const languages = ref<LanguageManifest | null>(null);
  const availableCount = ref<number>(0);

  async function setLaguage(locale: string) {
    try {
      await updateStorage(locale);
      window.location.reload();
    } catch (err) {
      throw new Error('Failed to set locale', { cause: err });
    }
  }

  async function loadLanguage() {
    const loadingStore = useLoadingStore();
    const token = loadingStore.startLoading();

    try {
      const currentLanguage =
        (await loadStorage()) ?? (await detectBrowserLanguage());

      languages.value = await loadConfig();
      availableCount.value = languages.value.available.length;

      if (languages.value?.available.includes(currentLanguage)) {
        locale.value = currentLanguage;
        flag.value = languages.value.flags[currentLanguage];
        fullName.value = languages.value.names[currentLanguage];
      } else {
        locale.value = languages.value.default;
        flag.value = languages.value.flags[languages.value.default];
        fullName.value = languages.value.names[languages.value.default];
        updateStorage(languages.value.default);
      }
    } catch (err) {
      throw new Error('Failed to load locale', { cause: err });
    } finally {
      loadingStore.stopLoading(token);
    }
  }

  return {
    availableCount,
    flag,
    fullName,
    languages,
    loadLanguage,
    locale,
    setLaguage,
  };
});
