export interface HttpClient {
  get<T>(url: string): Promise<T>;
}

export function withLogging(client: HttpClient, log: (msg: string) => void): HttpClient {
  return {
    async get<T>(url: string): Promise<T> {
      const started = Date.now();
      log(`GET ${url}`);
      try {
        const result = await client.get<T>(url);
        log(`OK ${url} ${Date.now() - started}ms`);
        return result;
      } catch (err) {
        log(`ERR ${url} ${err instanceof Error ? err.message : String(err)}`);
        throw err;
      }
    },
  };
}

export function withRetry(client: HttpClient, attempts: number): HttpClient {
  return {
    async get<T>(url: string): Promise<T> {
      let lastErr: unknown;
      for (let i = 0; i < attempts; i++) {
        try {
          return await client.get<T>(url);
        } catch (err) {
          lastErr = err;
        }
      }
      throw lastErr;
    },
  };
}

interface CacheEntry {
  createdAt: number;
  value: unknown;
}

export function withCache(
  client: HttpClient,
  ttlMs: number,
  now: () => number = Date.now,
): HttpClient {
  const cache = new Map<string, CacheEntry>();
  return {
    async get<T>(url: string): Promise<T> {
      const entry = cache.get(url);
      if (entry && entry.createdAt + ttlMs > now()) {
        return entry.value as T;
      }
      const value = await client.get<T>(url);
      cache.set(url, { createdAt: now(), value });
      return value;
    },
  };
}
