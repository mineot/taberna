import { defineStore, storeToRefs } from 'pinia';
import { publicPath } from '@util/paths.util';
import { ref } from 'vue';
import { useLanguageStore } from '@store/language.store';
import { useLoadingStore } from '@store/loading.store';
import {
  isConfigurationManifest,
  type LoadedConfiguration,
} from '@util/configuration';
import { fetchHtmlFragment, fetchJson } from '@util/fetch.util';
import { normalizeLocale } from '@util/locale.util';

export const useConfigStore = defineStore('config-store', () => {
  const { locale } = storeToRefs(useLanguageStore());
  const { startLoading, stopLoading } = useLoadingStore();

  const config = ref<LoadedConfiguration>();

  function applyConfiguration(configuration: LoadedConfiguration) {
    config.value = configuration;
  }

  async function prepareConfiguration(targetLocale: string) {
    const token = startLoading();

    try {
      const normalizedLocale = normalizeLocale(targetLocale);

      if (!normalizedLocale) throw new Error('Invalid locale');

      const path = publicPath(`config/${normalizedLocale}.json`);
      const manifest = await fetchJson(path, isConfigurationManifest);
      const { footer, home, ...site } = manifest;

      const [footerContent, homeContent] = await Promise.all([
        footer
          ? fetchHtmlFragment(
              publicPath(`content/${normalizedLocale}/${footer}`),
            )
          : undefined,
        home
          ? fetchHtmlFragment(publicPath(`content/${normalizedLocale}/${home}`))
          : undefined,
      ]);

      return {
        ...site,
        ...(footerContent === undefined ? {} : { footerContent }),
        ...(homeContent === undefined ? {} : { homeContent }),
      } satisfies LoadedConfiguration;
    } catch (err) {
      throw new Error('Failed to load config', { cause: err });
    } finally {
      stopLoading(token);
    }
  }

  async function loadConfiguration(targetLocale = locale.value) {
    const configuration = await prepareConfiguration(targetLocale);
    applyConfiguration(configuration);
    return configuration;
  }

  return {
    applyConfiguration,
    config,
    loadConfiguration,
    prepareConfiguration,
  };
});
