# Topic 14 · Exercise 14.1 — Chain of Responsibility: middleware

Реализуй движок middleware в стиле Express/Koa. Запрос проходит через цепочку обработчиков, каждый решает: пропустить дальше через `next()`, прервать цепочку (не вызвать `next`), или кинуть ошибку.

## Что нужно сделать

В `src/middleware.ts` реализуй `compose(middlewares)`:

- Возвращает функцию `(ctx) => Promise<void>`
- Внутри — рекурсивный диспетчер:
  ```ts
  function dispatch(i: number): Promise<void> {
    const mw = middlewares[i];
    if (!mw) return Promise.resolve();
    return Promise.resolve(mw(ctx, () => dispatch(i + 1)));
  }
  return dispatch(0);
  ```
- Если middleware кинет (sync или async) — ошибка пробрасывается через всю цепочку

## Главное

- Middleware вызывает `next()` чтобы передать управление дальше
- Если `next()` не вызван — следующие middleware не запускаются
- Можно делать что-то «после» вызова `next()` — это даёт onion-структуру: `> a > b > c < c < b < a`

## Критерии сдачи

- 8 тестов в `tests/unit/middleware.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
