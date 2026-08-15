export const STORAGE_KEY = 'taberna-lang';

export interface LanguageManifest {
  default: string;
  available: string[];
  flags: Record<string, string>;
  names: Record<string, string>;
}
