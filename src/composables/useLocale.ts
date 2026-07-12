import { ref } from 'vue';

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
      const manifestRes = await fetch('/languages.json');

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

      localStorage.setItem(STORAGE_KEY, locale.value);
      document.documentElement.lang = locale.value;
      flags.value = manifest.flags;
      available.value = manifest.available;
      loaded.value = true;
    } catch {
      locale.value = 'pt-br';
      loaded.value = true;
    }
  };

  const setLocale = (lang: string) => {
    locale.value = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  };

  return { locale, loaded, flags, available, loadLocale, setLocale };
}
