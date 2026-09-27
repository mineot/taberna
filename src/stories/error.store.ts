import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { ErrorManifest } from '@/helpers/manifest';

export const useErrorStore = defineStore('error-store', () => {
  const $error = ref<ErrorManifest | null>(null);

  const error = computed<ErrorManifest | null>((): ErrorManifest | null => {
    return $error.value;
  });

  const setError = (err: ErrorManifest): void => {
    $error.value = err;
  };

  const clearError = (): void => {
    $error.value = null;
  };

  return { error, setError, clearError };
});
