import { ref } from 'vue';
import { publicPath } from '../utils/paths';

const STORAGE_KEY = 'taberna-lang';

const locale = ref<string>('');
const loaded = ref(false);
const flags = ref<Record<string, string>>({});
const available = ref<string[]>([]);

interface LanguagesManifest {
  default: string;
  available: string[];
  flags: Record<string, string>;
}

const fallbackManifest: LanguagesManifest = {
  default: 'pt-br',
  available: ['pt-br'],
  flags: { 'pt-br': '🇧🇷' },
};

function applyManifest(manifest: LanguagesManifest, selected: string) {
  locale.value = selected;
  flags.value = manifest.flags;
  available.value = manifest.available;
  document.documentElement.lang = selected;

  try {
    localStorage.setItem(STORAGE_KEY, selected);
  } catch {
    return;
  }
}

function normalize(lang: string): string {
  return lang.toLowerCase().replace('_', '-');
}

function matchLocale(
  browserLangs: readonly string[],
  available: string[],
): string | null {
  for (const bl of browserLangs) {
    const normalized = normalize(bl);
    const exact = available.find((a) => a === normalized);

    if (exact) {
      return exact;
    }

    const prefix = normalized.split('-')[0];
    const partial = available.find((a) => a.startsWith(prefix));

    if (partial) {
      return partial;
    }
  }
  return null;
}

export function useLocale() {
  const loadLocale = async () => {
    if (loaded.value) return;

    try {
      const manifestRes = await fetch(publicPath('languages.json'));

      if (!manifestRes.ok) {
        throw new Error(`HTTP ${manifestRes.status}`);
      }

      const manifest: LanguagesManifest = await manifestRes.json();

      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored && manifest.available.includes(stored)) {
        locale.value = stored;
      } else {
        const detected = matchLocale(navigator.languages, manifest.available);
        locale.value = detected ?? manifest.default;
      }

      applyManifest(manifest, locale.value);
      loaded.value = true;
    } catch {
      applyManifest(fallbackManifest, fallbackManifest.default);
      loaded.value = true;
    }
  };

  const setLocale = (lang: string): boolean => {
    if (!available.value.includes(lang)) return false;
    locale.value = lang;
    document.documentElement.lang = lang;

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      return true;
    }

    return true;
  };

  return { locale, loaded, flags, available, loadLocale, setLocale };
}
