import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useLoadingStore = defineStore('loading-store', () => {
  const $loading = ref<string[]>([]);

  const loading = computed(() => $loading.value.length > 0);

  const startLoading = (): string => {
    const parteTempo = Date.now().toString(36);
    const parteAleatoria = Math.random().toString(36).substring(2, 10);
    const token = `${parteTempo}-${parteAleatoria}`;
    $loading.value.push(token);
    return token;
  };

  const stopLoading = (token: string): void => {
    const index = $loading.value.findIndex((t) => t === token);

    if (index !== -1) {
      $loading.value.splice(index, 1);
    }
  };

  return { loading, startLoading, stopLoading };
});
