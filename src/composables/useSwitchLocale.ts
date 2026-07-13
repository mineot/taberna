import { useRouter } from 'vue-router';
import { useConfig } from './useConfig';
import { useLocale } from './useLocale';

export function useSwitchLocale() {
  const router = useRouter();
  const { loadConfig } = useConfig();
  const { setLocale } = useLocale();

  async function switchLocale(lang: string) {
    setLocale(lang);
    await loadConfig(lang);
    if (router.currentRoute.value.path !== '/') {
      router.push('/');
    }
  }

  return { switchLocale };
}
