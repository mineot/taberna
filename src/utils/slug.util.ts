const DIRECTORY_SEGMENT = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;
const HTML_FILE_SEGMENT = /^[a-zA-Z0-9][a-zA-Z0-9_-]*\.htm$/;

export function normalizeContentSlug(value: unknown): string | null {
  if (typeof value !== 'string' || value.length === 0) return null;

  const segments = value.split('/');
  const file = segments.at(-1);
  const directories = segments.slice(0, -1);

  if (
    !file ||
    !HTML_FILE_SEGMENT.test(file) ||
    !directories.every((segment) => DIRECTORY_SEGMENT.test(segment))
  ) {
    return null;
  }

  return [...directories, file].join('/');
}
