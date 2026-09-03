import { describe, expect, it } from 'vitest';
import {
  isConfigurationManifest,
  isLanguageManifest,
} from '@util/configuration';

const configuration = {
  title: 'Taberna',
  image: 'images/logo.png',
  description: 'Description',
  ownership: 'Ownership',
  navigator: [],
};

const languages = {
  default: 'pt-br',
  available: ['pt-br', 'en-us'],
  flags: { 'pt-br': '🇧🇷', 'en-us': '🇺🇸' },
  names: { 'pt-br': 'Português', 'en-us': 'English' },
};

describe('configuration validation', () => {
  it('accepts safe nested content references', () => {
    expect(
      isConfigurationManifest({
        ...configuration,
        footer: 'layout/footer.htm',
        home: 'pages/home.htm',
      }),
    ).toBe(true);
  });

  it.each(['../footer.htm', '../../home.htm', '/absolute.htm', 'page.html'])(
    'rejects an unsafe content reference: %s',
    (home) => {
      expect(isConfigurationManifest({ ...configuration, home })).toBe(false);
    },
  );

  it('rejects unsafe locale identifiers', () => {
    expect(
      isLanguageManifest({
        ...languages,
        default: '../../outside',
        available: ['../../outside'],
        flags: { '../../outside': 'X' },
        names: { '../../outside': 'Outside' },
      }),
    ).toBe(false);
  });
});
