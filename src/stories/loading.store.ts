import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useLoadingStore = defineStore('loading-store', () => {
  const $loading = ref<string[]>([]);

  const createToken = () => {
    const parteTempo = Date.now().toString(36);
    const parteAleatoria = Math.random().toString(36).substring(2, 10);
    return `${parteTempo}-${parteAleatoria}`;
  };

  const startLoading = (token: string): void => {
    $loading.value.push(token);
  };

  const stopLoading = (token: string): void => {
    const index = $loading.value.findIndex((t) => t === token);

    if (index !== -1) {
      $loading.value.splice(index, 1);
    }
  };

  const loading = computed(() => {
    return $loading.value.length > 0;
  });

  return { loading, startLoading, stopLoading, createToken };
});
