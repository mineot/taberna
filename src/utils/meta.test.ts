import { beforeEach, describe, expect, it } from 'vitest';
import { setMetaDescription } from './meta';

describe('setMetaDescription', () => {
  beforeEach(() => {
    document.head.querySelector('meta[name="description"]')?.remove();
  });

  it('creates the meta description when it does not exist', () => {
    setMetaDescription('Site description');

    expect(
      document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
        ?.content,
    ).toBe('Site description');
  });

  it('updates the existing meta description', () => {
    setMetaDescription('First description');
    setMetaDescription('Updated description');

    expect(
      document.head.querySelectorAll('meta[name="description"]'),
    ).toHaveLength(1);
    expect(
      document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
        ?.content,
    ).toBe('Updated description');
  });
});
