import { defineStore } from 'pinia';
import { useErrorStore } from '@/stories/error.store';
import { useLoadingStore } from '@/stories/loading.store';
import { computed, ref } from 'vue';

interface ConfigurationManifest {
  scaffold: {
    enabled: boolean;
    header: string;
    footer: string;
  };
}

export const useConfigStore = defineStore('config-store', () => {
  const { captureError } = useErrorStore();
  const { startLoading, stopLoading } = useLoadingStore();

  const $manisfest = ref<ConfigurationManifest | null>(null);

  const loadConfiguration = async () => {
    const token = startLoading();

    captureError(
      async () => {
        const response = await fetch('/config/configuration.json');
        $manisfest.value = (await response.json()) as ConfigurationManifest;
      },
      {
        title: 'Error to load configuration',
        message:
          'Could not load configuration. Please check console to more details.',
        rethrow: true,
      },
    ).finally(() => stopLoading(token));
  };

  const config = computed(() => $manisfest.value);

  return { loadConfiguration, config };
});
