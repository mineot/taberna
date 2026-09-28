import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useBackdropStore } from '@/stories/backdrop.store';

type Sidebar = Record<string, boolean>;

export const useSidebarStore = defineStore('sidebar-store', () => {
  const { showBackdrop, hideBackdrop } = useBackdropStore();
  const $sidebar = ref<Sidebar>({});

  const openedSidebar = (id: string) => {
    return $sidebar.value[id];
  };

  const openSidebar = (id: string) => {
    $sidebar.value[id] = true;
    showBackdrop();
  };

  const closeSidebar = (id: string) => {
    $sidebar.value[id] = false;
    hideBackdrop();
  };

  return { openedSidebar, openSidebar, closeSidebar };
});
