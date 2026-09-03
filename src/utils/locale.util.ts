const LOCALE_PATTERN = /^[a-z]{2,8}(?:-[a-z0-9]{1,8})*$/;

export function normalizeLocale(value: unknown): string | null {
  if (typeof value !== 'string') return null;

  const locale = value.trim().toLowerCase();
  return LOCALE_PATTERN.test(locale) ? locale : null;
}

interface LocalePreferences {
  available: string[];
  browserLocales: readonly string[];
  defaultLocale: string;
  storedLocale: string | null;
}

function exactMatch(candidate: unknown, available: string[]): string | null {
  const locale = normalizeLocale(candidate);
  return locale && available.includes(locale) ? locale : null;
}

function compatibleLanguageMatch(
  candidate: unknown,
  available: string[],
): string | null {
  const locale = normalizeLocale(candidate);
  if (!locale) return null;

  const language = locale.split('-', 1)[0];
  const matches = available.filter(
    (availableLocale) => availableLocale.split('-', 1)[0] === language,
  );

  return matches.length === 1 ? (matches[0] ?? null) : null;
}

export function resolvePreferredLocale({
  available,
  browserLocales,
  defaultLocale,
  storedLocale,
}: LocalePreferences): string {
  const storedMatch = exactMatch(storedLocale, available);
  if (storedMatch) return storedMatch;

  for (const candidate of browserLocales) {
    const match =
      exactMatch(candidate, available) ??
      compatibleLanguageMatch(candidate, available);

    if (match) return match;
  }

  return defaultLocale;
}
