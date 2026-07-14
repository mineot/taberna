export function isSafeExternalHref(href: string): boolean {
  try {
    const url = new URL(href.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
