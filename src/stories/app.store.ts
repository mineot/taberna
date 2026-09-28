import { defineStore, storeToRefs } from 'pinia';

import { useBackdropStore } from '@/stories/backdrop.store';
import { useConfigStore } from '@/stories/config.store';
import { useErrorStore } from '@/stories/error.store';
import { useLanguageStore } from '@/stories/language.store';
import { useLoadingStore } from '@/stories/loading.store';
import { useSidebarStore } from '@/stories/sidebar.store';

export const useAppStore = defineStore('app-store', () => {
  const { detectLanguage } = useLanguageStore();
  const { loadScaffoldConfiguration } = useConfigStore();
  const { hideBackdrop, showBackdrop } = useBackdropStore();
  const { captureError } = useErrorStore();
  const { startLoading, stopLoading } = useLoadingStore();
  const { openedSidebar, openSidebar, closeSidebar } = useSidebarStore();

  const { backdrop } = storeToRefs(useBackdropStore());
  const { error } = storeToRefs(useErrorStore());
  const { loading } = storeToRefs(useLoadingStore());
  const { language, languageFlag, languageName } =
    storeToRefs(useLanguageStore());

  const initApp = async () => {
    await detectLanguage();
    await loadScaffoldConfiguration();
  };

  return {
    backdrop,
    captureError,
    closeSidebar,
    error,
    hideBackdrop,
    initApp,
    language,
    languageFlag,
    languageName,
    loading,
    openedSidebar,
    openSidebar,
    showBackdrop,
    startLoading,
    stopLoading,
  };
});
