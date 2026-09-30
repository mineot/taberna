export const isFullHtmlDocument = (text: string): boolean =>
  /^\s*(<!doctype html|<html[\s>])/i.test(text);

export const normalizeFragmentPath = (file: string): string | null => {
  if (
    file.startsWith('/') ||
    file.includes('\\') ||
    file.includes('..') ||
    file.split('/').some((segment) => segment.length === 0) ||
    !file.endsWith('.htm')
  ) {
    return null;
  }
  return file;
};

export interface LoadContentFragmentOptions {
  base: string;
  locale: string;
  file: string;
}

export const loadContentFragment = async ({
  base,
  locale,
  file,
}: LoadContentFragmentOptions): Promise<string> => {
  const fragmentPath = normalizeFragmentPath(file);

  if (!fragmentPath) {
    throw new Error(`Invalid fragment path: ${file}`);
  }

  const url = `${base}content/${locale}/${fragmentPath}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with HTTP ${response.status}: ${url}`);
  }

  const text = await response.text();

  if (isFullHtmlDocument(text)) {
    throw new Error(
      `Expected a content fragment but received a full HTML document: ${url}`,
    );
  }

  return text;
};