import { vi } from 'vitest';

export function failStorageReads(
  error: Error = new DOMException('Unavailable', 'SecurityError'),
) {
  return vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw error;
  });
}

export function failStorageWrites(
  error: Error = new DOMException('Unavailable', 'SecurityError'),
) {
  return vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw error;
  });
}

export function installMatchMedia(
  matches: boolean | ((query: string) => boolean) = false,
) {
  const matchMedia = vi.fn((query: string) => {
    return {
      matches: typeof matches === 'function' ? matches(query) : matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as MediaQueryList;
  });

  vi.stubGlobal('matchMedia', matchMedia);

  return matchMedia;
}

export function useTestClock(now = new Date('2026-01-01T00:00:00Z')) {
  vi.useFakeTimers();
  vi.setSystemTime(now);
}
