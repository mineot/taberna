import { defineStore, storeToRefs } from 'pinia';
import { publicPath } from '../utils/paths.util';
import { ref } from 'vue';
import { useLanguageStore } from './language.store';
import { useLoadingStore } from './loading.store';

import type {
  Block,
  BlockManifest,
  BlockManifestSource,
} from '../utils/content.util';

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} loading ${path}`);
  }

  const contentType = response.headers.get('content-type');

  if (!contentType?.includes('application/json')) {
    throw new Error(
      `Expected JSON from ${path}, received ${contentType ?? 'unknown'}`,
    );
  }

  return (await response.json()) as T;
}

export const useHomeStore = defineStore('home-store', () => {
  const { startLoading, stopLoading } = useLoadingStore();
  const { locale } = storeToRefs(useLanguageStore());
  const homeData = ref<BlockManifest>([]);

  async function loadHome() {
    const token = startLoading();

    try {
      const path = publicPath(`content/${locale.value}/home.json`);
      const manifest = await fetchJson<BlockManifestSource>(path);

      homeData.value = await Promise.all(
        manifest.map(async (entry) => {
          if (typeof entry !== 'string') {
            return entry;
          }

          const blockPath = publicPath(
            `content/${locale.value}/${entry.replace(/^\/+/, '')}`,
          );

          return fetchJson<Block>(blockPath);
        }),
      );
    } catch (err) {
      throw new Error('Failed to load home', { cause: err });
    } finally {
      stopLoading(token);
    }
  }

  return { loadHome, homeData };
});
