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

interface LanguageOption {
  locale: string;
  flag: string;
  name: string;
}

const normalizeLocale = (locale: string): string => locale.trim().toLowerCase();

const readStoredLanguage = (): string | null => {
  try {
    return localStorage.getItem(STORE_KEY);
  } catch {
    return null;
  }
};

const persistLanguage = (locale: string): void => {
  try {
    localStorage.setItem(STORE_KEY, locale);
  } catch {
    return;
  }
};

const readBrowserLanguages = (): string[] => {
  const preferences: string[] = [];

  if (Array.isArray(navigator.languages)) {
    preferences.push(...navigator.languages);
  }

  if (navigator.language) {
    preferences.push(navigator.language);
  }

  return preferences;
};

const resolveLanguage = (available: string[], preferences: (string | null)[], fallback: string): string => {
  const supported = available.map(normalizeLocale);

  for (const preference of preferences) {
    if (!preference) {
      continue;
    }

    const index = supported.indexOf(normalizeLocale(preference));

    if (index !== -1) {
      return available[index];
    }
  }

  const fallbackIndex = supported.indexOf(normalizeLocale(fallback));

  if (fallbackIndex !== -1) {
    return available[fallbackIndex];
  }

  return available[0];
};

export const useLanguageStore = defineStore('language-store', () => {
  const { captureError } = useErrorStore();
  const { startLoading, stopLoading } = useLoadingStore();

  const $language = ref<string>('');
  const $manifest = ref<LanguageManifest | null>(null);

  const languages = computed<LanguageOption[]>(() => {
    const manifest = $manifest.value;

    if (!manifest) {
      return [];
    }

    return manifest.available.map((locale: string) => ({
      locale,
      flag: manifest.flags[locale] ?? '',
      name: manifest.names[locale] ?? '',
    }));
  });

  const language = computed<string>(() => $language.value);

  const languageFlag = computed<string>(() => {
    if (!$language.value) {
      return '';
    }

    return $manifest.value?.flags[$language.value] ?? '';
  });

  const languageName = computed<string>(() => {
    if (!$language.value) {
      return '';
    }

    return $manifest.value?.names[$language.value] ?? '';
  });

  const detectLanguage = async (): Promise<void> => {
    const token = startLoading();

    await captureError(
      async () => {
        const response = await fetch(`${import.meta.env.BASE_URL}config/languages.json`);

        if (!response.ok) {
          throw new Error(`Request failed with HTTP ${response.status}: languages.json`);
        }

        const manifest = (await response.json()) as LanguageManifest;

        if (!Array.isArray(manifest?.available) || manifest.available.length === 0) {
          throw new Error('Language manifest has no available locales');
        }

        $manifest.value = manifest;

        const preferences = [readStoredLanguage(), ...readBrowserLanguages()];

        $language.value = resolveLanguage(manifest.available, preferences, manifest.default);
        persistLanguage($language.value);
      },
      {
        title: 'Error to detect language',
        message: 'Could not detect language. Please check console to more details.',
        rethrow: true,
      },
    ).finally(() => stopLoading(token));
  };

  const switchLanguage = (locale: string): void => {
    if (!$manifest.value?.available.includes(locale)) {
      return;
    }

    persistLanguage(locale);
    window.location.reload();
  };

  return { detectLanguage, switchLanguage, language, languages, languageFlag, languageName };
});
