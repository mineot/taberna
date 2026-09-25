import { defineStore, storeToRefs } from 'pinia';
import { useLanguageStore } from '@/stories/language.store';

export const usePathsStore = defineStore('paths-store', () => {
  const { language, languageManifest } = storeToRefs(useLanguageStore());

  const getLanguagePath = (): string => {
    return '/config/languages.json';
  };

  const getScaffoldPath = () => {
    return `/config/scaffold.json`;
  };

  const getContentPath = (name: string): string => {
    console.log(language);
    return `/content/${language?.value ?? languageManifest?.value?.default}/${name}`;
  };

  return { getLanguagePath, getScaffoldPath, getContentPath };
});
