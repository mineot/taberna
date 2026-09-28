import { defineStore } from 'pinia';
import { useErrorStore } from '@/stories/error.store';
import { useLoadingStore } from '@/stories/loading.store';
import { ref } from 'vue';

interface ScaffoldManifest {
  enabled: boolean;
  brand: string;
  menu: string;
  nav: string;
  footer: string;
  owner: string;
  year: string;
}

export const useConfigStore = defineStore('config-store', () => {
  const { captureError } = useErrorStore();
  const { startLoading, stopLoading } = useLoadingStore();

  const $scaffoldManifest = ref<ScaffoldManifest>({} as ScaffoldManifest);

  const loadScaffoldConfiguration = async () => {
    const token = startLoading();

    captureError(
      async () => {
        const response = await fetch('/config/scaffold.json');
        $scaffoldManifest.value = (await response.json()) as ScaffoldManifest;
      },
      {
        title: 'Error to load scaffold configuration',
        message:
          'Could not load scaffold configuration. Please check console to more details.',
        rethrow: true,
      },
    ).finally(() => stopLoading(token));
  };

  return { loadScaffoldConfiguration };
});
