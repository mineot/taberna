import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Error {
  title: string;
  status: number;
  message: string;
}

export const useErrorStore = defineStore('error-store', () => {
  const error = ref<Error | null>(null);

  const setError = (err: Error): void => {
    error.value = err;
  };

  const hasError = (): boolean => error.value !== null;

  return { error, setError, hasError };
});
