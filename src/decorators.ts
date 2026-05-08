import type { HttpClient, HttpRequest, HttpResponse } from './http-client.js';

export interface LogEntry {
  url: string;
  ok: boolean;
  durationMs: number;
}

// TODO: реализовать декоратор-обёртку.
// Возвращает новый клиент, который перед/после реального вызова кладёт запись в `log`.
// При ошибке тоже ставит запись (ok: false) и пробрасывает ошибку дальше.
export function withLogging(_inner: HttpClient, _log: LogEntry[]): HttpClient {
  throw new Error('withLogging is not implemented yet');
}

// TODO: декоратор retry.
// Если внутренний клиент кидает — повторяет запрос до `attempts` раз.
// Все попытки кроме последней игнорируют ошибку. Последняя — пробрасывается.
// Считает общее количество попыток в массиве (для теста).
export function withRetry(_inner: HttpClient, _attempts: number): HttpClient {
  throw new Error('withRetry is not implemented yet');
}

// TODO: декоратор cache.
// Кэширует ответ по url. Повторный запрос по тому же url возвращает кэшированный
// ответ без вызова inner. Игнорирует TTL — простая версия.
export function withCache(_inner: HttpClient): HttpClient {
  throw new Error('withCache is not implemented yet');
}

// Реэкспорт типов
export type { HttpClient, HttpRequest, HttpResponse };
