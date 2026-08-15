import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export type LoadingToken = symbol;

export const useLoadingStore = defineStore('loading-store', () => {
  const pendingTasks = reactive(new Set<LoadingToken>());
  const loading = computed(() => pendingTasks.size > 0);

  function startLoading(): LoadingToken {
    const token = Symbol('loading-task');
    pendingTasks.add(token);
    return token;
  }

  function stopLoading(token: LoadingToken) {
    pendingTasks.delete(token);
  }

  return {
    loading,
    startLoading,
    stopLoading,
  };
});
