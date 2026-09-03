import { beforeEach, describe, expect, it } from 'vitest';
import {
  readDocumentMetadata,
  syncDocumentMetadata,
} from '@util/document.util';

describe('document metadata', () => {
  beforeEach(() => {
    document.documentElement.lang = 'en';
    document.title = 'Initial title';
    const description = document.createElement('meta');
    description.name = 'description';
    description.content = 'Initial description';
    document.head.append(description);
  });

  it('reads the current document values as a fallback snapshot', () => {
    expect(readDocumentMetadata()).toEqual({
      description: 'Initial description',
      language: 'en',
      title: 'Initial title',
    });
  });

  it('updates language, title, and an existing description element', () => {
    syncDocumentMetadata({
      description: 'Nova descrição',
      language: 'pt-br',
      title: 'Novo título',
    });

    expect(document.documentElement.lang).toBe('pt-br');
    expect(document.title).toBe('Novo título');
    expect(
      document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
        ?.content,
    ).toBe('Nova descrição');
    expect(
      document.head.querySelectorAll('meta[name="description"]'),
    ).toHaveLength(1);
  });

  it('creates a missing description element', () => {
    document.head
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.remove();

    syncDocumentMetadata({ description: 'Created description' });

    expect(
      document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
        ?.content,
    ).toBe('Created description');
  });

  it('restores safe fallback values for blank metadata', () => {
    syncDocumentMetadata(
      { description: ' ', language: '', title: '\n' },
      { description: '', language: '', title: '' },
    );

    expect(readDocumentMetadata()).toEqual({
      description: 'Taberna',
      language: 'en',
      title: 'Taberna',
    });
  });
});
