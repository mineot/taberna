import { defineStore, storeToRefs } from 'pinia';
import { publicPath } from '@util/paths.util';
import { ref } from 'vue';
import { useLanguageStore } from '@store/language.store';
import { useLoadingStore } from '@store/loading.store';
import type { ConfigurationManifest } from '@util/configuration';

export const useConfigStore = defineStore('config-store', () => {
  const { locale } = storeToRefs(useLanguageStore());
  const { startLoading, stopLoading } = useLoadingStore();

  const config = ref<ConfigurationManifest>();

  async function loadConfiguration() {
    const token = startLoading();

    try {
      const path = publicPath(`config/${locale.value}.json`);
      const response = await fetch(path);
      config.value = (await response.json()) as ConfigurationManifest;

      if (config.value.footer) {
        const footerPath = publicPath(
          `content/${locale.value}/${config.value.footer}`,
        );
        const footerResponse = await fetch(footerPath);
        config.value.footer = (await footerResponse.text()) as string;
      }

      if (config.value.home) {
        const homePath = publicPath(
          `content/${locale.value}/${config.value.home}`,
        );
        const homeResponse = await fetch(homePath);
        config.value.home = (await homeResponse.text()) as string;
      }
    } catch (err) {
      throw new Error('Failed to load config', { cause: err });
    } finally {
      stopLoading(token);
    }
  }

  return { loadConfiguration, config };
});
