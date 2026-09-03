import { describe, expect, it } from 'vitest';
import { fetchHtmlFragment, fetchJson, ResourceError } from '@util/fetch.util';
import {
  jsonResponse,
  mockFetchFailure,
  mockFetchSequence,
  textResponse,
} from '@/test/http';

function isMessage(value: unknown): value is { message: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof value.message === 'string'
  );
}

describe('fetchJson', () => {
  it('returns validated JSON data', async () => {
    mockFetchSequence(jsonResponse({ message: 'Ready' }));

    await expect(fetchJson('/data.json', isMessage)).resolves.toEqual({
      message: 'Ready',
    });
  });

  it('rejects unsuccessful HTTP responses', async () => {
    mockFetchSequence(jsonResponse({}, { status: 503 }));

    await expect(fetchJson('/data.json', isMessage)).rejects.toMatchObject({
      kind: 'http',
      status: 503,
    });
  });

  it('distinguishes resources that were not found', async () => {
    mockFetchSequence(jsonResponse({}, { status: 404 }));

    await expect(fetchJson('/missing.json', isMessage)).rejects.toMatchObject({
      kind: 'not-found',
      status: 404,
    });
  });

  it('distinguishes aborted requests from network failures', async () => {
    mockFetchFailure(new DOMException('Aborted', 'AbortError'));

    await expect(fetchJson('/data.json', isMessage)).rejects.toMatchObject({
      kind: 'aborted',
    });
  });

  it('rejects data that does not match the validator', async () => {
    mockFetchSequence(jsonResponse({ message: 42 }));

    await expect(fetchJson('/data.json', isMessage)).rejects.toMatchObject({
      kind: 'invalid-data',
    });
  });

  it('rejects unexpected content types', async () => {
    mockFetchSequence(textResponse('{"message":"Ready"}'));

    await expect(fetchJson('/data.json', isMessage)).rejects.toMatchObject({
      kind: 'invalid-content-type',
    });
  });
});

describe('fetchHtmlFragment', () => {
  it('returns an HTML fragment', async () => {
    mockFetchSequence(textResponse('<main>Ready</main>'));

    await expect(fetchHtmlFragment('/page.htm')).resolves.toBe(
      '<main>Ready</main>',
    );
  });

  it('rejects a complete HTML document returned by an SPA fallback', async () => {
    mockFetchSequence(
      textResponse(
        '<!doctype html><html><body><div id="app"></div></body></html>',
      ),
    );

    const result = fetchHtmlFragment('/missing.htm');

    await expect(result).rejects.toBeInstanceOf(ResourceError);
    await expect(result).rejects.toMatchObject({ kind: 'unexpected-document' });
  });
});
