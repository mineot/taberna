import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useConfigStore } from '@store/config.store';
import { useLanguageStore } from '@store/language.store';
import { useLoadingStore } from '@store/loading.store';
import { jsonResponse, mockFetchSequence, textResponse } from '@/test/http';

const manifest = {
  title: 'Taberna',
  image: 'images/logo.png',
  description: 'Description',
  ownership: 'Ownership',
  footer: 'footer.htm',
  home: 'home.htm',
  navigator: [{ text: 'Home', href: '#/' }],
};

describe('useConfigStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    useLanguageStore().locale = 'pt-br';
  });

  it('loads the manifest and hydrates referenced content', async () => {
    const fetchMock = mockFetchSequence(
      jsonResponse(manifest),
      textResponse('<footer>Footer</footer>'),
      textResponse('<main>Home</main>'),
    );
    const store = useConfigStore();

    await store.loadConfiguration();

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(store.config).toEqual({
      title: manifest.title,
      image: manifest.image,
      description: manifest.description,
      ownership: manifest.ownership,
      navigator: manifest.navigator,
      footerContent: '<footer>Footer</footer>',
      homeContent: '<main>Home</main>',
    });
    expect(useLoadingStore().loading).toBe(false);
  });

  it('rejects unsuccessful referenced content responses', async () => {
    mockFetchSequence(
      jsonResponse(manifest),
      textResponse('<html>Not found</html>', { status: 404 }),
      textResponse('<main>Home</main>'),
    );

    await expect(useConfigStore().loadConfiguration()).rejects.toThrow();
  });

  it('does not publish partially loaded configuration', async () => {
    mockFetchSequence(
      jsonResponse(manifest),
      textResponse('<footer>Footer</footer>'),
      textResponse('<html>Not found</html>', { status: 404 }),
    );
    const store = useConfigStore();

    await expect(store.loadConfiguration()).rejects.toThrow();

    expect(store.config).toBeUndefined();
    expect(useLoadingStore().loading).toBe(false);
  });

  it('rejects a malformed configuration manifest', async () => {
    mockFetchSequence(jsonResponse({ ...manifest, navigator: null }));
    const store = useConfigStore();

    await expect(store.loadConfiguration()).rejects.toThrow();

    expect(store.config).toBeUndefined();
  });

  it('rejects unsafe navigator links', async () => {
    mockFetchSequence(
      jsonResponse({
        ...manifest,
        navigator: [{ text: 'Unsafe', href: 'javascript:alert(1)' }],
      }),
    );
    const store = useConfigStore();

    await expect(store.loadConfiguration()).rejects.toThrow();

    expect(store.config).toBeUndefined();
  });

  it('prepares another locale without publishing it immediately', async () => {
    const fetchMock = mockFetchSequence(
      jsonResponse(manifest),
      textResponse('<footer>Footer</footer>'),
      textResponse('<main>Home</main>'),
    );
    const store = useConfigStore();

    const configuration = await store.prepareConfiguration('en-us');

    expect(fetchMock.mock.calls[0]?.[0]).toMatch(/config\/en-us\.json$/);
    expect(store.config).toBeUndefined();

    store.applyConfiguration(configuration);
    expect(store.config).toEqual(configuration);
  });

  it('rejects an unsafe locale before making a request', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');

    await expect(
      useConfigStore().prepareConfiguration('../../outside'),
    ).rejects.toThrow('Failed to load config');

    expect(fetchMock).not.toHaveBeenCalled();
    expect(useLoadingStore().loading).toBe(false);
  });
});
