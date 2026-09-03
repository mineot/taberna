const URL_BASE = 'https://taberna.invalid/';
const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

export function normalizeLinkHref(
  value: unknown,
  external = false,
): string | null {
  if (typeof value !== 'string') return null;

  const href = value.trim();
  if (!href) return null;

  try {
    const url = external ? new URL(href) : new URL(href, URL_BASE);
    return ALLOWED_PROTOCOLS.has(url.protocol) ? href : null;
  } catch {
    return null;
  }
}
