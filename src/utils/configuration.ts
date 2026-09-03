import { normalizeLinkHref } from '@util/link.util';
import { normalizeLocale } from '@util/locale.util';
import { normalizeContentSlug } from '@util/slug.util';

export interface NavigatorItem {
  text: string;
  href: string;
}

export interface ConfigurationManifest {
  title: string;
  image: string;
  description: string;
  ownership: string;
  footer?: string;
  home?: string;
  navigator: NavigatorItem[];
}

export interface LoadedConfiguration extends Omit<
  ConfigurationManifest,
  'footer' | 'home'
> {
  footerContent?: string;
  homeContent?: string;
}

export interface LanguageManifest {
  default: string;
  available: string[];
  flags: Record<string, string>;
  names: Record<string, string>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isOptionalContentPath(value: unknown): boolean {
  return value === undefined || normalizeContentSlug(value) !== null;
}

function isNavigatorItem(value: unknown): value is NavigatorItem {
  return (
    isRecord(value) &&
    typeof value.text === 'string' &&
    normalizeLinkHref(value.href) !== null
  );
}

export function isConfigurationManifest(
  value: unknown,
): value is ConfigurationManifest {
  return (
    isRecord(value) &&
    typeof value.title === 'string' &&
    typeof value.image === 'string' &&
    typeof value.description === 'string' &&
    typeof value.ownership === 'string' &&
    isOptionalContentPath(value.footer) &&
    isOptionalContentPath(value.home) &&
    Array.isArray(value.navigator) &&
    value.navigator.every(isNavigatorItem)
  );
}

export function isLanguageManifest(value: unknown): value is LanguageManifest {
  if (
    !isRecord(value) ||
    normalizeLocale(value.default) !== value.default ||
    !Array.isArray(value.available) ||
    !value.available.every((locale) => normalizeLocale(locale) === locale) ||
    !isRecord(value.flags) ||
    !isRecord(value.names)
  ) {
    return false;
  }

  const available = value.available;
  const flags = value.flags;
  const names = value.names;

  return (
    available.length > 0 &&
    new Set(available).size === available.length &&
    available.includes(value.default) &&
    available.every(
      (locale) =>
        typeof flags[locale] === 'string' && typeof names[locale] === 'string',
    )
  );
}
