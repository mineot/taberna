import { describe, expect, it } from 'vitest';
import { normalizeLinkHref } from '@util/link.util';

describe('normalizeLinkHref', () => {
  it.each([
    '#/about.htm',
    '/about',
    './about',
    'articles.htm',
    'https://example.com',
    'http://example.com',
  ])('accepts a safe internal href: %s', (href) => {
    expect(normalizeLinkHref(href)).toBe(href);
  });

  it.each(['https://example.com', 'http://example.com'])(
    'accepts a safe external href: %s',
    (href) => {
      expect(normalizeLinkHref(href, true)).toBe(href);
    },
  );

  it.each([
    ['javascript:alert(1)', false],
    ['data:text/html,unsafe', false],
    ['mailto:user@example.com', false],
    ['', false],
    ['./relative', true],
    ['#/relative', true],
  ])('rejects an unsafe href: %s', (href, external) => {
    expect(normalizeLinkHref(href, external)).toBeNull();
  });

  it('rejects non-string values', () => {
    expect(normalizeLinkHref(null)).toBeNull();
  });
});
