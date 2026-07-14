import { beforeEach, describe, expect, it, vi } from 'vitest';

function response(data: unknown, ok = true, status = 200) {
  return {
    ok,
    status,
    json: vi.fn().mockResolvedValue(data),
  } as unknown as Response;
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolver) => {
    resolve = resolver;
  });
  return { promise, resolve };
}

describe('useConfig', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('exposes an initial loading error instead of remaining loading', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(response(null, false, 404)),
    );
    const { useConfig } = await import('./useConfig');
    const { loadConfig, loaded, loading, error } = useConfig();

    await expect(loadConfig('pt-br')).resolves.toBe(false);
    expect(loaded.value).toBe(false);
    expect(loading.value).toBe(false);
    expect(error.value).toBe('HTTP 404');
  });

  it('ignores an obsolete response that finishes last', async () => {
    const first = deferred<Response>();
    const second = deferred<Response>();
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockReturnValueOnce(first.promise)
        .mockReturnValueOnce(second.promise),
    );
    const { useConfig } = await import('./useConfig');
    const { loadConfig, config, currentLocale } = useConfig();
    const firstLoad = loadConfig('pt-br');
    const secondLoad = loadConfig('en-us');

    second.resolve(response({ site: { title: 'English' } }));
    await expect(secondLoad).resolves.toBe(true);
    first.resolve(response({ site: { title: 'Português' } }));
    await expect(firstLoad).resolves.toBe(false);

    expect(currentLocale.value).toBe('en-us');
    expect(config.value?.site.title).toBe('English');
  });
});
