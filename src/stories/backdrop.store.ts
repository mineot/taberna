import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useBackdropStore = defineStore('backdrop-store', () => {
  const $backdrop = ref<boolean>(false);

  const backdrop = computed(() => $backdrop.value);

  const showBackdrop = () => {
    $backdrop.value = true;
  };

  const hideBackdrop = () => {
    $backdrop.value = false;
  };

  return { backdrop, showBackdrop, hideBackdrop };
});
