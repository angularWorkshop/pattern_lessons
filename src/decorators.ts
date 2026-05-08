import type { HttpClient, HttpRequest, HttpResponse } from './http-client.js';

export interface LogEntry {
  url: string;
  ok: boolean;
  durationMs: number;
}

export function withLogging(inner: HttpClient, log: LogEntry[]): HttpClient {
  return async (req) => {
    const started = Date.now();
    try {
      const response = await inner(req);
      log.push({ url: req.url, ok: true, durationMs: Date.now() - started });
      return response;
    } catch (error) {
      log.push({ url: req.url, ok: false, durationMs: Date.now() - started });
      throw error;
    }
  };
}

export function withRetry(inner: HttpClient, attempts: number): HttpClient {
  return async (req) => {
    let lastError: unknown;
    for (let i = 0; i < attempts; i++) {
      try {
        return await inner(req);
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError;
  };
}

export function withCache(inner: HttpClient): HttpClient {
  const cache = new Map<string, HttpResponse>();
  return async (req) => {
    const cached = cache.get(req.url);
    if (cached) {
      return cached;
    }
    const response = await inner(req);
    cache.set(req.url, response);
    return response;
  };
}

export type { HttpClient, HttpRequest, HttpResponse };
