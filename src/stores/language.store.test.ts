import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useLanguageStore } from '@store/language.store';
import { useLoadingStore } from '@store/loading.store';
import { failStorageReads, failStorageWrites } from '@/test/browser';
import { jsonResponse, mockFetchSequence } from '@/test/http';

const languages = {
  default: 'pt-br',
  available: ['pt-br', 'en-us'],
  flags: {
    'pt-br': '🇧🇷',
    'en-us': '🇺🇸',
  },
  names: {
    'pt-br': 'Português (Brasil)',
    'en-us': 'English (America)',
  },
};

describe('useLanguageStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('loads a supported language from storage', async () => {
    localStorage.setItem('taberna-lang', 'EN-US');
    mockFetchSequence(jsonResponse(languages));
    const store = useLanguageStore();

    await store.loadLanguage();

    expect(store.locale).toBe('en-us');
    expect(store.flag).toBe('🇺🇸');
    expect(store.fullName).toBe('English (America)');
    expect(store.availableCount).toBe(2);
    expect(useLoadingStore().loading).toBe(false);
  });

  it('continues with a fallback when storage is unavailable', async () => {
    failStorageReads();
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['fr-FR']);
    mockFetchSequence(jsonResponse(languages));
    const store = useLanguageStore();

    await expect(store.loadLanguage()).resolves.toBe('pt-br');
    expect(store.locale).toBe('pt-br');
  });

  it('ignores invalid storage and scans browser language preferences', async () => {
    localStorage.setItem('taberna-lang', 'fr-fr');
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['fr-FR', 'en-US']);
    mockFetchSequence(jsonResponse(languages));
    const store = useLanguageStore();

    await store.loadLanguage();

    expect(store.locale).toBe('en-us');
    expect(localStorage.getItem('taberna-lang')).toBe('en-us');
  });

  it('uses an unambiguous regional fallback for the browser language', async () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['en-GB']);
    mockFetchSequence(jsonResponse(languages));
    const store = useLanguageStore();

    await store.loadLanguage();

    expect(store.locale).toBe('en-us');
  });

  it('continues in memory when storage cannot be updated', async () => {
    localStorage.setItem('taberna-lang', 'pt-br');
    failStorageWrites();
    mockFetchSequence(jsonResponse(languages));
    const store = useLanguageStore();

    await expect(store.loadLanguage()).resolves.toBe('pt-br');
    expect(store.setLanguage('en-us')).toBe(true);
    expect(store.locale).toBe('en-us');
  });

  it('rejects languages that are not in the loaded manifest', async () => {
    mockFetchSequence(jsonResponse(languages));
    const store = useLanguageStore();
    await store.loadLanguage();
    const initialLocale = store.locale;

    expect(store.setLanguage('unknown')).toBe(false);
    expect(store.locale).toBe(initialLocale);
  });

  it('rejects a malformed language manifest', async () => {
    mockFetchSequence(
      jsonResponse({
        ...languages,
        default: 'unknown',
      }),
    );

    await expect(useLanguageStore().loadLanguage()).rejects.toThrow();

    expect(useLoadingStore().loading).toBe(false);
  });
});
