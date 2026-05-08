# Topic 10 · Exercise 10.1 — Decorator: HTTP-клиент с обёртками

Реализуй три функциональных декоратора: `withLogging`, `withRetry`, `withCache`. Каждый — функция `(client) =&gt; client`, которая оборачивает базовый клиент новым поведением. Композиция: `withCache(withRetry(withLogging(base, log), 3))`.

## Что нужно сделать

В `src/decorators.ts`:

- `withLogging(inner, log)` — каждый вызов записывает в `log`: `{ url, ok, durationMs }`. На ошибке `ok: false` и пробрасываем
- `withRetry(inner, attempts)` — повторяем при ошибке до `attempts` попыток. На последней — пробрасываем. На успехе сразу выходим
- `withCache(inner)` — `Map<url, HttpResponse>`. Повторный URL — из кэша, inner не вызывается

## Главное

Декораторы — это обёртки. Каждый возвращает новую функцию того же типа `HttpClient`, ничего не мутирует у входной. Порядок применения важен (cache над retry означает «сначала кэш, потом retry», retry над cache — наоборот).

## Критерии сдачи

- 9 тестов в `tests/unit/decorators.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
