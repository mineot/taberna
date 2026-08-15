import { defineStore, storeToRefs } from 'pinia';
import { publicPath } from '../utils/paths.util';
import { ref } from 'vue';
import { useLanguageStore } from './language.store';
import { useLoadingStore } from './loading.store';

interface ConfigurationManifest {
  site: {
    title: string;
    description: string;
    image: string;
    ownership: string;
  };
}

export const useConfigStore = defineStore('config-store', () => {
  const storeLanguage = useLanguageStore();
  const storeLoading = useLoadingStore();

  const { locale } = storeToRefs(storeLanguage);
  const { startLoading, stopLoading } = storeLoading;

  const config = ref<ConfigurationManifest | null>(null);

  async function loadConfiguration() {
    const token = startLoading();

    try {
      const path = publicPath(`config/${locale.value}.json`);
      const response = await fetch(path);
      config.value = (await response.json()) as ConfigurationManifest;
    } catch (err) {
      throw new Error('Failed to load config', { cause: err });
    } finally {
      stopLoading(token);
    }
  }

  return { loadConfiguration, config };
});
