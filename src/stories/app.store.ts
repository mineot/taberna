import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app-store', () => {
  const error = ref<Error | null>(null);

  const setError = (err: Error): void => {
    error.value = err;
  };

  const hasError = (): boolean => error.value !== null;

  return { error, setError, hasError };
});
