import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

type Sidebar = Record<string, boolean>;

export const useBehaviorStore = defineStore('behavior-store', () => {
  const $loaders = ref<string[]>([]);
  const $backdrop = ref<boolean>(false);
  const $sidebar = ref<Sidebar>({});

  const startLoading = (): string => {
    const parteTempo = Date.now().toString(36);
    const parteAleatoria = Math.random().toString(36).substring(2, 10);
    const token = `${parteTempo}-${parteAleatoria}`;
    $loaders.value.push(token);
    return token;
  };

  const stopLoading = (token: string): void => {
    const index = $loaders.value.findIndex((t) => t === token);

    if (index !== -1) {
      $loaders.value.splice(index, 1);
    }
  };

  const showBackdrop = () => {
    $backdrop.value = true;
  };

  const hideBackdrop = () => {
    $backdrop.value = false;
  };

  const showSidebar = (id: string) => {
    $sidebar.value[id] = true;
  };

  const hideSidebar = (id: string) => {
    $sidebar.value[id] = false;
  };

  const loading = computed(() => {
    return $loaders.value.length > 0;
  });

  const backdrop = computed(() => {
    return $backdrop.value;
  });

  const sidebar = computed(() => {
    return $sidebar.value;
  });

  return {
    loading,
    backdrop,
    sidebar,
    startLoading,
    stopLoading,
    showBackdrop,
    hideBackdrop,
    showSidebar,
    hideSidebar,
  };
});
