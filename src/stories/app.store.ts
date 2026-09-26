import { defineStore } from 'pinia';
import {
  fetchContentFile,
  fetchScaffoldManifest,
} from './helpers/configuration';
import { computed, ref } from 'vue';
import { useErrorStore } from '@/stories/error.store';
import { useLoadingStore } from '@/stories/loading.store';
import type { LanguageManifest, ScaffoldManifest } from './helpers/manifest';

import {
  fetchLanguageManifest,
  findLanguage,
  getNavigatorLanguage,
  getStoredLanguage,
  storeLanguage,
} from './helpers/language';

export const useAppStore = defineStore('app-store', () => {
  const { createToken, startLoading, stopLoading } = useLoadingStore();
  const { setError } = useErrorStore();

  const language = ref<string>('');
  const languageManifest = ref<LanguageManifest>({} as LanguageManifest);
  const scaffoldManifest = ref<ScaffoldManifest>({} as ScaffoldManifest);
  const scaffoldBrad = ref<string>('');
  const scaffoldMenu = ref<string>('');
  const scaffoldNav = ref<string>('');
  const scaffoldFooter = ref<string>('');

  async function initApp() {
    const token = createToken();
    startLoading(token);

    try {
      const storedLanguage: string | null = await getStoredLanguage();
      const navigatorLanguage: string = await getNavigatorLanguage();
      await storeLanguage(navigatorLanguage, storedLanguage);

      languageManifest.value = await fetchLanguageManifest();

      language.value = await findLanguage(
        languageManifest.value,
        storedLanguage,
        navigatorLanguage,
      );

      scaffoldManifest.value = await fetchScaffoldManifest();

      if (scaffoldManifest.value.enabled) {
        scaffoldBrad.value = await fetchContentFile(
          language.value,
          scaffoldManifest.value.brand,
        );

        scaffoldMenu.value = await fetchContentFile(
          language.value,
          scaffoldManifest.value.menu,
        );

        scaffoldNav.value = await fetchContentFile(
          language.value,
          scaffoldManifest.value.nav,
        );

        scaffoldFooter.value = await fetchContentFile(
          language.value,
          scaffoldManifest.value.footer,
        );
      }

      return;
    } catch (error) {
      console.error(error);

      setError({
        title: 'Init App Error',
        status: 500,
        message: 'Could not init app.',
        throwcase: error,
      });
    } finally {
      stopLoading(token);
    }
  }

  const languageFlag = computed(() => {
    return languageManifest.value.flags[language.value];
  });

  const languageName = computed(() => {
    return languageManifest.value.names[language.value];
  });

  return {
    initApp,
    language,
    languageFlag,
    languageManifest,
    languageName,
    scaffoldBrad,
    scaffoldFooter,
    scaffoldManifest,
    scaffoldMenu,
    scaffoldNav,
  };
});
