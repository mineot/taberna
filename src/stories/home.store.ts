import { defineStore, storeToRefs } from 'pinia';
import { publicPath } from '../utils/paths.util';
import { ref } from 'vue';
import { useLanguageStore } from './language.store';
import { useLoadingStore } from './loading.store';
import type { BlockManifest } from '../utils/content.util';

export const useHomeStore = defineStore('home-store', () => {
  const { startLoading, stopLoading } = useLoadingStore();
  const { locale } = storeToRefs(useLanguageStore());

  const homeData = ref<BlockManifest | null>(null);

  async function loadHome() {
    const token = startLoading();

    try {
      const path = publicPath(`content/${locale.value}/home.json`);
      console.log(path);
      const response = await fetch(path);
      homeData.value = (await response.json()) as BlockManifest;
    } catch (err) {
      throw new Error('Failed to load home', { cause: err });
    } finally {
      stopLoading(token);
    }
  }

  return { loadHome, homeData };
});
