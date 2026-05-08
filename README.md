# Topic 6 · Exercise 6.2 — Cache singleton с изоляцией тестов

Реализовать `Cache<V>` как singleton, но так, чтобы тесты не текли друг в друга. Это и есть основная боль singleton'ов: глобальное состояние.

## Что нужно сделать

В `src/cache.ts`:

- `private constructor()`
- `static getInstance<V>()` — лениво создаёт глобальный инстанс. Внутри храним `Cache<unknown>`, наружу cast'им к `Cache<V>`
- `static reset()` — обнуляет `instance`. Используется в `beforeEach`
- `static createIsolated<V>()` — возвращает НЕ singleton-инстанс. Запасной выход для DI и для тестов, которым нужен свой кэш
- `get / set / delete / clear` — обычные операции над `Map<string, V>`

## Главное

Тесты демонстрируют test isolation: три теста подряд (A пишет, B читает, C проверяет пустоту). Без `beforeEach(() => Cache.reset())` тест B видит данные от A. Это и есть тот случай, ради которого в singleton приходится добавлять reset-метод.

## Критерии сдачи

- 13 тестов в `tests/unit/cache.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
