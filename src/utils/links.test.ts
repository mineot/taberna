import { describe, expect, it } from 'vitest';
import { isSafeExternalHref } from './links';

describe('isSafeExternalHref', () => {
  it('accepts only HTTP and HTTPS URLs', () => {
    expect(isSafeExternalHref('https://example.com')).toBe(true);
    expect(isSafeExternalHref(' http://example.com/path ')).toBe(true);
    expect(isSafeExternalHref('JaVaScRiPt:alert(1)')).toBe(false);
    expect(isSafeExternalHref('data:text/html,unsafe')).toBe(false);
    expect(isSafeExternalHref('/internal')).toBe(false);
  });
});
