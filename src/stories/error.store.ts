import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { ErrorManifest } from './manifest';

export const useErrorStore = defineStore('error-store', () => {
  const $error = ref<ErrorManifest | null>(null);

  const setError = (err: ErrorManifest): void => {
    $error.value = err;
  };

  const hasError = computed<boolean>(() => {
    return $error.value !== null;
  });

  const error = computed<ErrorManifest | null>((): ErrorManifest | null => {
    return $error.value ?? null;
  });

  return { error, hasError, setError };
});
