export interface HttpClient {
  get<T>(url: string): Promise<T>;
}

// TODO: реализуй 3 декоратора-обёртки.
//
// withLogging(client, log): каждый вызов get(url) → log(`GET ${url}`) ПЕРЕД и log(`OK ${url} ${ms}ms`) ПОСЛЕ.
//   На ошибке: log(`ERR ${url} ${msg}`) и проброс.
//
// withRetry(client, attempts): пытается attempts раз. После последней неудачной — пробрасывает ошибку.
//   На успех — сразу возвращает результат.
//
// withCache(client, ttlMs, now = Date.now):
//   - ключ — url
//   - если в кэше свежее значение (createdAt + ttlMs > now()) — отдаёт его без вызова base
//   - иначе — вызывает client.get, кладёт в кэш, отдаёт
//   - стартим кэш ленивым Map

export function withLogging(
  _client: HttpClient,
  _log: (msg: string) => void,
): HttpClient {
  throw new Error('Not implemented');
}

export function withRetry(_client: HttpClient, _attempts: number): HttpClient {
  throw new Error('Not implemented');
}

export function withCache(
  _client: HttpClient,
  _ttlMs: number,
  _now?: () => number,
): HttpClient {
  throw new Error('Not implemented');
}
