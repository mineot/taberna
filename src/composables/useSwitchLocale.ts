import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useConfig } from './useConfig';
import { useLocale } from './useLocale';

export function useSwitchLocale() {
  const router = useRouter();
  const { loadConfig } = useConfig();
  const { available, setLocale } = useLocale();
  const switching = ref(false);
  let activeSwitch = 0;

  async function switchLocale(lang: string) {
    if (!available.value.includes(lang)) return;

    const switchId = ++activeSwitch;
    switching.value = true;

    try {
      const configLoaded = await loadConfig(lang);

      if (switchId !== activeSwitch || !configLoaded || !setLocale(lang))
        return;

      if (router.currentRoute.value.path !== '/') {
        await router.push('/');
      }
    } finally {
      if (switchId === activeSwitch) {
        switching.value = false;
      }
    }
  }

  return { switchLocale, switching };
}
