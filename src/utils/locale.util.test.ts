import { describe, expect, it } from 'vitest';
import { normalizeLocale, resolvePreferredLocale } from '@util/locale.util';

const available = ['pt-br', 'en-us'];

function resolve(
  storedLocale: string | null,
  browserLocales: readonly string[],
) {
  return resolvePreferredLocale({
    available,
    browserLocales,
    defaultLocale: 'pt-br',
    storedLocale,
  });
}

describe('locale utilities', () => {
  it.each([
    ['PT-BR', 'pt-br'],
    [' en-US ', 'en-us'],
    ['zh-Hant-TW', 'zh-hant-tw'],
  ])('normalizes a safe locale: %s', (input, expected) => {
    expect(normalizeLocale(input)).toBe(expected);
  });

  it.each(['../en-us', 'en_us', '/pt-br', '', 'en--us'])(
    'rejects an unsafe locale: %s',
    (locale) => {
      expect(normalizeLocale(locale)).toBeNull();
    },
  );

  it('uses a valid stored locale first', () => {
    expect(resolve('EN-US', ['pt-BR'])).toBe('en-us');
  });

  it('ignores invalid storage and scans every browser preference', () => {
    expect(resolve('fr-fr', ['fr-FR', 'en-US'])).toBe('en-us');
  });

  it('matches an unambiguous locale by its base language', () => {
    expect(resolve(null, ['en-GB'])).toBe('en-us');
  });

  it('does not choose arbitrarily between ambiguous regional locales', () => {
    expect(
      resolvePreferredLocale({
        available: ['pt-br', 'en-us', 'en-gb'],
        browserLocales: ['en-AU'],
        defaultLocale: 'pt-br',
        storedLocale: null,
      }),
    ).toBe('pt-br');
  });
});
