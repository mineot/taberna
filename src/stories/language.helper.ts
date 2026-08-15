import { publicPath } from '../utils/paths.util';
import { STORAGE_KEY, type LanguageManifest } from './language.types';

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
