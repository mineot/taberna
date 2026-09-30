import { defineStore, storeToRefs } from 'pinia';

import { useErrorStore } from '@/stories/error.store';
import { useLanguageStore } from '@/stories/language.store';
import { useLoadingStore } from '@/stories/loading.store';

export const useAppStore = defineStore('app-store', () => {
  const { detectLanguage, switchLanguage } = useLanguageStore();
  const { captureError } = useErrorStore();
  const { startLoading, stopLoading } = useLoadingStore();

  const { error } = storeToRefs(useErrorStore());
  const { loading } = storeToRefs(useLoadingStore());
  const { language, languages, languageFlag, languageName } = storeToRefs(useLanguageStore());

  const initApp = async () => {
    await detectLanguage();
  };

  return {
    captureError,
    error,
    initApp,
    language,
    languageFlag,
    languageName,
    languages,
    loading,
    startLoading,
    stopLoading,
    switchLanguage,
  };
});
