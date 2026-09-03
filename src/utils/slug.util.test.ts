import { describe, expect, it } from 'vitest';
import { normalizeContentSlug } from '@util/slug.util';

describe('normalizeContentSlug', () => {
  it.each([
    ['about.htm', 'about.htm'],
    ['articles/article1.htm', 'articles/article1.htm'],
    ['nested-path/article-name.htm', 'nested-path/article-name.htm'],
  ])('accepts supported content paths', (input, expected) => {
    expect(normalizeContentSlug(input)).toBe(expected);
  });

  it.each([
    '',
    'about',
    'about.html',
    '../config/pt-br.json',
    'articles/../about.htm',
    '/about.htm',
    'articles//article1.htm',
    'articles/article 1.htm',
    'articles/article1.htm/extra',
    ['about.htm'],
  ])('rejects unsupported or unsafe paths', (input) => {
    expect(normalizeContentSlug(input)).toBeNull();
  });
});
