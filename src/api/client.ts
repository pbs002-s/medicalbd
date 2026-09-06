/**
 * HTTP client for the ShasthoSetu backend.
 *
 * The app is offline-first: when `VITE_API_URL` is not configured, or the
 * network call fails, callers fall back to the local store. That is not a
 * demo shortcut — rural chambers lose connectivity routinely and a doctor
 * must still be able to write a prescription.
 */

const BASE_URL: string = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

/** True when a real backend is configured for this build. */
export const isBackendConfigured = (): boolean => BASE_URL.length > 0;

let authToken: string | null = null;

/** Store the bearer token issued by login (Sanctum / JWT). */
export const setAuthToken = (token: string | null): void => {
  authToken = token;
};

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Raised when there is no backend to call, so callers know to use local data. */
export class OfflineError extends Error {
  constructor(message = 'No backend configured or network unavailable') {
    super(message);
    this.name = 'OfflineError';
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  signal?: AbortSignal;
  /** Abort the request after this many milliseconds. */
  timeoutMs?: number;
}

/**
 * Issue a JSON request against the configured backend.
 *
 * Throws `OfflineError` when no backend is configured or the fetch fails at
 * the transport level, and `ApiError` for a 4xx/5xx response — the two need
 * different handling, since only the first should silently fall back to local
 * data.
 */
export const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  if (!isBackendConfigured()) throw new OfflineError();

  const { method = 'GET', body, signal, timeoutMs = 12_000 } = options;

  // Time out rather than hanging forever on a stalled mobile connection.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  signal?.addEventListener('abort', () => controller.abort(), { once: true });

  let response: Response;
  try {
    response = await fetch(`${BASE_URL.replace(/\/$/, '')}${path}`, {
      method,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    throw new OfflineError(error instanceof Error ? error.message : String(error));
  } finally {
    clearTimeout(timer);
  }

  const text = await response.text();
  const parsed: unknown = text ? safeParse(text) : null;

  if (!response.ok) {
    throw new ApiError(
      (parsed as { message?: string } | null)?.message ?? `Request failed with ${response.status}`,
      response.status,
      parsed
    );
  }

  return parsed as T;
};

const safeParse = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};
