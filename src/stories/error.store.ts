import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

interface ErrorManifest {
  title: string;
  message: string;
  status?: number;
}

interface CaptureOptions {
  title: string;
  message: string;
  status?: number;
  rethrow?: boolean;
}

export const useErrorStore = defineStore('error-store', () => {
  const $error = ref<ErrorManifest | null>(null);

  const captureError = async (
    fn: () => Promise<unknown>,
    options: CaptureOptions,
  ): Promise<boolean> => {
    try {
      await fn();
      return true;
    } catch (cause) {
      console.log(cause);

      $error.value = {
        title: options.title,
        message: options.message,
        status: options.status ?? 500,
      };

      if (options.rethrow) {
        throw cause;
      }

      return false;
    }
  };

  const error = computed(() => $error.value);

  return { error, captureError };
});
