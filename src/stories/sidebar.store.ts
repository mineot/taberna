import { defineStore } from 'pinia';
import { ref } from 'vue';

type Sidebar = Record<string, boolean>;

export const useSidebarStore = defineStore('sidebar-store', () => {
  const $sidebar = ref<Sidebar>({});

  const openedSidebar = (id: string) => {
    return $sidebar.value[id];
  };

  const openSidebar = (id: string) => {
    return ($sidebar.value[id] = true);
  };

  const closeSidebar = (id: string) => {
    return ($sidebar.value[id] = false);
  };

  return { openedSidebar, openSidebar, closeSidebar };
});
