import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useErrorStore } from '@/stories/error.store';
import { useLoadingStore } from '@/stories/loading.store';
import { usePathsStore } from '@/stories/paths.store';

interface ScaffoldManifest {
  enabled: boolean;
  ['brand-htm-name']: string;
  ['menu-htm-name']: string;
  ['nav-htm-name']: string;
  ['footer-htm-name']: string;
  owner: string;
  year: string;
}

// async function loadHTM(name: string): Promise<string> {
//   if (!name) {
//     return '';
//   }

//   try {
//     const response = await fetch('/documento.htm');

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     return await response.text();
//   } catch (error) {
//     throw error;
//   }
// }

export const useConfigStore = defineStore('config-store', () => {
  const { getScaffoldPath } = usePathsStore();
  const { setError } = useErrorStore();
  const { startLoading, stopLoading, createToken } = useLoadingStore();

  const scaffold = ref<ScaffoldManifest | null>(null);
  const brand = ref<string>('');
  const menu = ref<string>('');
  const nav = ref<string>('');
  const footer = ref<string>('');

  const initConfiguration = async (): Promise<void> => {
    const token = createToken();
    startLoading(token);

    try {
      const scaffoldJson = await fetch(getScaffoldPath());
      scaffold.value = (await scaffoldJson.json()) as ScaffoldManifest;
      //   brand.value = await loadHTM(
      //     getContentPath(scaffold.value['brand-htm-name']),
      //   );
      //   menu.value = await loadHTM(scaffold.value['menu-htm-name']);
      //   nav.value = await loadHTM(scaffold.value['nav-htm-name']);
      //   footer.value = await loadHTM(scaffold.value['footer-htm-name']);
      return;
    } catch (error) {
      console.error(error);
      setError({
        title: 'Configuration Error',
        status: 500,
        message: 'Could not load configuration.',
      });
    } finally {
      stopLoading(token);
    }
  };

  return { scaffold, brand, menu, nav, footer, initConfiguration };
});
