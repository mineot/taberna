export type ResourceErrorKind =
  | 'aborted'
  | 'http'
  | 'invalid-content-type'
  | 'invalid-data'
  | 'network'
  | 'not-found'
  | 'unexpected-document';

export class ResourceError extends Error {
  readonly kind: ResourceErrorKind;
  readonly path: string;
  readonly status?: number;

  constructor(
    message: string,
    options: {
      cause?: unknown;
      kind: ResourceErrorKind;
      path: string;
      status?: number;
    },
  ) {
    super(message, { cause: options.cause });
    this.name = 'ResourceError';
    this.kind = options.kind;
    this.path = options.path;
    this.status = options.status;
  }
}

type Validator<T> = (value: unknown) => value is T;

async function request(path: string, init?: RequestInit): Promise<Response> {
  let response: Response;

  try {
    response = await fetch(path, init);
  } catch (error) {
    const aborted =
      error instanceof DOMException && error.name === 'AbortError';

    throw new ResourceError(`Failed to request ${path}`, {
      cause: error,
      kind: aborted ? 'aborted' : 'network',
      path,
    });
  }

  if (!response.ok) {
    throw new ResourceError(
      `HTTP ${response.status} while requesting ${path}`,
      {
        kind: response.status === 404 ? 'not-found' : 'http',
        path,
        status: response.status,
      },
    );
  }

  return response;
}

function assertContentType(
  response: Response,
  path: string,
  acceptedTypes: string[],
) {
  const contentType = response.headers
    .get('content-type')
    ?.split(';', 1)[0]
    .trim()
    .toLowerCase();

  if (!contentType || !acceptedTypes.includes(contentType)) {
    throw new ResourceError(
      `Unexpected content type while requesting ${path}`,
      {
        kind: 'invalid-content-type',
        path,
        status: response.status,
      },
    );
  }
}

export async function fetchJson<T>(
  path: string,
  validator: Validator<T>,
  init?: RequestInit,
): Promise<T> {
  const response = await request(path, init);
  const contentType = response.headers
    .get('content-type')
    ?.split(';', 1)[0]
    .trim()
    .toLowerCase();

  if (
    !contentType ||
    (contentType !== 'application/json' && !contentType.endsWith('+json'))
  ) {
    throw new ResourceError(
      `Unexpected content type while requesting ${path}`,
      {
        kind: 'invalid-content-type',
        path,
        status: response.status,
      },
    );
  }

  let data: unknown;

  try {
    data = await response.json();
  } catch (error) {
    throw new ResourceError(`Invalid JSON while requesting ${path}`, {
      cause: error,
      kind: 'invalid-data',
      path,
      status: response.status,
    });
  }

  if (!validator(data)) {
    throw new ResourceError(`Invalid data while requesting ${path}`, {
      kind: 'invalid-data',
      path,
      status: response.status,
    });
  }

  return data;
}

export async function fetchHtmlFragment(
  path: string,
  init?: RequestInit,
): Promise<string> {
  const response = await request(path, init);
  assertContentType(response, path, ['text/html', 'application/xhtml+xml']);

  const content = await response.text();

  if (/<!doctype\s+html|<html(?:\s|>)/i.test(content)) {
    throw new ResourceError(
      `Unexpected HTML document while requesting ${path}`,
      {
        kind: 'unexpected-document',
        path,
        status: response.status,
      },
    );
  }

  return content;
}
