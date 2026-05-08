# Topic 7 · Exercise 7.2 — Адаптер callback → Promise · Solution

Реализовать `promisify`, который превращает функцию с Node-style callback в обычную async-функцию.

## Что нужно сделать

В `src/promisify.ts` реализовать `promisify<Args, R>(fn)`:
- возвращаемая функция принимает те же `Args`
- внутри создаёт `Promise<R>`, передаёт в `fn` callback `(err, result) => err ? reject(err) : resolve(result)`
- `try/catch` вокруг вызова — синхронная ошибка тоже должна попасть в `reject`

## Контракт

```ts
const fn = (a: number, b: number, cb: (err: Error | null, r?: number) => void) => cb(null, a + b);
const fnP = promisify(fn);
await fnP(1, 2); // Promise<number> = 3
```

## Критерии сдачи

- 6 тестов в `tests/unit/promisify.test.ts` зелёные (resolve, reject, setTimeout, multi-args, lazy, sync exception)
- Тип-контракты: `Args` корректно вычисляются, `R` сохраняется
- `npm run check` зелёный
