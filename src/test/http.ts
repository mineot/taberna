import { vi } from 'vitest';

export function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set('content-type', 'application/json');

  return new Response(JSON.stringify(body), { ...init, headers });
}

export function textResponse(body: string, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set('content-type', 'text/html');

  return new Response(body, { ...init, headers });
}

export function mockFetchSequence(...responses: Response[]) {
  const fetchMock = vi.spyOn(globalThis, 'fetch');

  responses.forEach((response) => {
    fetchMock.mockResolvedValueOnce(response);
  });

  return fetchMock;
}

export function mockFetchFailure(error: unknown) {
  return vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(error);
}
