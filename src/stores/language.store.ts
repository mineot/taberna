import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { publicPath } from '@util/paths.util';
import { useLoadingStore } from '@store/loading.store';
import { isLanguageManifest, type LanguageManifest } from '@util/configuration';
import { fetchJson } from '@util/fetch.util';
import { normalizeLocale, resolvePreferredLocale } from '@util/locale.util';

const STORAGE_KEY = 'taberna-lang';

function readStorage(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)?.toLowerCase() ?? null;
  } catch {
    return null;
  }
}

function persistLanguage(locale: string): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
    return true;
  } catch {
    return false;
  }
}

function detectBrowserLanguages(): string[] {
  try {
    const locales = Array.from(navigator.languages ?? []);
    return locales.length > 0
      ? locales
      : navigator.language
        ? [navigator.language]
        : [];
  } catch {
    return [];
  }
}

async function loadManifest(): Promise<LanguageManifest> {
  const path = publicPath('config/languages.json');
  return fetchJson(path, isLanguageManifest);
}

export const useLanguageStore = defineStore('language-store', () => {
  const locale = ref('');
  const languages = ref<LanguageManifest | null>(null);

  const availableCount = computed(() => languages.value?.available.length ?? 0);
  const flag = computed(() => languages.value?.flags[locale.value] ?? '');
  const fullName = computed(() => languages.value?.names[locale.value] ?? '');

  function isLanguageAvailable(candidate: string): boolean {
    const normalizedLocale = normalizeLocale(candidate);
    return normalizedLocale
      ? (languages.value?.available.includes(normalizedLocale) ?? false)
      : false;
  }

  function setLanguage(candidate: string): boolean {
    const normalizedLocale = normalizeLocale(candidate);

    if (!normalizedLocale || !isLanguageAvailable(normalizedLocale))
      return false;

    locale.value = normalizedLocale;
    persistLanguage(normalizedLocale);
    return true;
  }

  async function loadLanguage() {
    const loadingStore = useLoadingStore();
    const token = loadingStore.startLoading();

    try {
      const manifest = await loadManifest();
      const selectedLocale = resolvePreferredLocale({
        available: manifest.available,
        browserLocales: detectBrowserLanguages(),
        defaultLocale: manifest.default,
        storedLocale: readStorage(),
      });

      languages.value = manifest;
      locale.value = selectedLocale;
      persistLanguage(selectedLocale);

      return selectedLocale;
    } catch (error) {
      throw new Error('Failed to load locale', { cause: error });
    } finally {
      loadingStore.stopLoading(token);
    }
  }

  return {
    availableCount,
    flag,
    fullName,
    isLanguageAvailable,
    languages,
    loadLanguage,
    locale,
    setLanguage,
  };
});
