import type { LanguageManifest } from './manifest';
import { getLanguageConfigPath } from './paths';

const STORE_KEY = 'tblang';

export async function getStoredLanguage(): Promise<string | null> {
  return localStorage.getItem(STORE_KEY);
}

export async function getNavigatorLanguage(): Promise<string> {
  return navigator.language.toLowerCase();
}

export async function storeLanguage(navigator: string, stored: string | null) {
  if (!stored) {
    localStorage.setItem(STORE_KEY, navigator);
  }
}

export async function fetchLanguageManifest(): Promise<LanguageManifest> {
  try {
    const response = await fetch(getLanguageConfigPath());
    return (await response.json()) as LanguageManifest;
  } catch {
    throw new Error('Could not load language manifest.');
  }
}

export async function findLanguage(
  manifest: LanguageManifest,
  storedLanguage: string | null,
  navigatorLanguage: string,
): Promise<string> {
  const finded = manifest.available.find((lang: string) => {
    return lang === storedLanguage || lang === navigatorLanguage;
  });

  if (finded) {
    return finded;
  }

  return manifest.default;
}
