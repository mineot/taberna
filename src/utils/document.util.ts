export interface DocumentMetadata {
  description: string;
  language: string;
  title: string;
}

const SAFE_FALLBACK: DocumentMetadata = {
  description: 'Taberna',
  language: 'en',
  title: 'Taberna',
};

function normalizedValue(value: string | null | undefined): string | null {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

export function readDocumentMetadata(
  target: Document = document,
): DocumentMetadata {
  const title = normalizedValue(target.title) ?? SAFE_FALLBACK.title;

  return {
    description:
      normalizedValue(
        target.head
          .querySelector<HTMLMetaElement>('meta[name="description"]')
          ?.getAttribute('content'),
      ) ?? title,
    language:
      normalizedValue(target.documentElement.getAttribute('lang')) ??
      SAFE_FALLBACK.language,
    title,
  };
}

export function syncDocumentMetadata(
  metadata: Partial<DocumentMetadata>,
  fallback: DocumentMetadata = SAFE_FALLBACK,
  target: Document = document,
) {
  const description =
    normalizedValue(metadata.description) ??
    normalizedValue(fallback.description) ??
    SAFE_FALLBACK.description;
  const language =
    normalizedValue(metadata.language) ??
    normalizedValue(fallback.language) ??
    SAFE_FALLBACK.language;
  const title =
    normalizedValue(metadata.title) ??
    normalizedValue(fallback.title) ??
    SAFE_FALLBACK.title;

  target.documentElement.setAttribute('lang', language);
  target.title = title;

  let descriptionElement = target.head.querySelector<HTMLMetaElement>(
    'meta[name="description"]',
  );

  if (!descriptionElement) {
    descriptionElement = target.createElement('meta');
    descriptionElement.setAttribute('name', 'description');
    target.head.append(descriptionElement);
  }

  descriptionElement.setAttribute('content', description);
}
