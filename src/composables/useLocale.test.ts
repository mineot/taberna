import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('useLocale', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    document.documentElement.lang = 'en';
  });

  it('applies a complete Portuguese fallback when the manifest fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network error')),
    );
    const { useLocale } = await import('./useLocale');
    const { loadLocale, locale, loaded, available, flags } = useLocale();

    await loadLocale();

    expect(loaded.value).toBe(true);
    expect(locale.value).toBe('pt-br');
    expect(available.value).toEqual(['pt-br']);
    expect(flags.value).toEqual({ 'pt-br': '🇧🇷' });
    expect(document.documentElement.lang).toBe('pt-br');
  });
});
