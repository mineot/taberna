import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useErrorStore } from '@/stories/error.store';
import { useBehaviorStore } from '@/stories/behavior.store';
import type { LanguageManifest, ScaffoldManifest } from '@/helpers/manifest';

import {
  fetchContentFile,
  fetchScaffoldManifest,
} from '@/helpers/configuration';

import {
  fetchLanguageManifest,
  findLanguage,
  getNavigatorLanguage,
  getStoredLanguage,
  storeLanguage,
} from '@/helpers/language';

export const useAppStore = defineStore('app-store', () => {
  const { startLoading, stopLoading } = useBehaviorStore();
  const { setError } = useErrorStore();

  const $languageManifest = ref<LanguageManifest>({} as LanguageManifest);
  const $scaffoldManifest = ref<ScaffoldManifest>({} as ScaffoldManifest);

  const $language = ref<string>('');
  const $scaffoldBrand = ref<string>('');
  const $scaffoldMenu = ref<string>('');
  const $scaffoldNav = ref<string>('');
  const $scaffoldFooter = ref<string>('');

  async function initApp() {
    const token = startLoading();

    try {
      const storedLanguage: string | null = await getStoredLanguage();
      const navigatorLanguage: string = await getNavigatorLanguage();
      await storeLanguage(navigatorLanguage, storedLanguage);

      $languageManifest.value = await fetchLanguageManifest();
      $scaffoldManifest.value = await fetchScaffoldManifest();

      $language.value = await findLanguage(
        $languageManifest.value,
        storedLanguage,
        navigatorLanguage,
      );

      if ($scaffoldManifest.value.enabled) {
        $scaffoldBrand.value = await fetchContentFile(
          $language.value,
          $scaffoldManifest.value.brand,
        );

        $scaffoldMenu.value = await fetchContentFile(
          $language.value,
          $scaffoldManifest.value.menu,
        );

        $scaffoldNav.value = await fetchContentFile(
          $language.value,
          $scaffoldManifest.value.nav,
        );

        $scaffoldFooter.value = await fetchContentFile(
          $language.value,
          $scaffoldManifest.value.footer,
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

  const language = computed<string>(() => {
    return $language.value;
  });

  const languageFlag = computed<string>(() => {
    return $languageManifest.value.flags[$language.value];
  });

  const languageName = computed<string>(() => {
    return $languageManifest.value.names[$language.value];
  });

  const scaffoldEnabled = computed<boolean>(() => {
    return $scaffoldManifest.value.enabled;
  });

  const scaffoldBrand = computed<string>(() => {
    return $scaffoldBrand.value;
  });

  const scaffoldMenu = computed<string>(() => {
    return $scaffoldMenu.value;
  });

  const scaffoldNav = computed<string>(() => {
    return $scaffoldNav.value;
  });

  const scaffoldFooter = computed<string>(() => {
    return $scaffoldFooter.value;
  });

  return {
    initApp,
    language,
    languageFlag,
    languageName,
    scaffoldBrand,
    scaffoldEnabled,
    scaffoldFooter,
    scaffoldMenu,
    scaffoldNav,
  };
});
