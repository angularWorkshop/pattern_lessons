# Topic 14 · Exercise 14.2 — Chain of Responsibility: цепочка валидаторов · Solution

Реализуй `chain(validators)` — компоновщик асинхронных валидаторов поля в стиле middleware. Первый валидатор, вернувший ошибку, обрывает цепочку.

## Что нужно сделать

В `src/validators.ts` реализуй `chain<T>(validators)`:

- Возвращает функцию `(value) => Promise<ValidationResult>`
- Внутри — рекурсивный диспетчер `dispatch(i)`:
  - Если `validators[i]` нет → вернуть `{ ok: true }`
  - Иначе позвать `validators[i](value, () => dispatch(i + 1))` и обернуть в `Promise.resolve(...)`
- Следующий валидатор запускается только если предыдущий вызвал `next()`

## Главное

- Sync валидатор может вернуть результат напрямую: `return { ok: false, field, reason }` — это обрывает цепочку
- Async валидатор может `await` сделать что угодно перед `next()`
- `required` и `emailFormat` уже реализованы как примеры; `uniqueInDb` — фабрика-async-валидатор

## Критерии сдачи

- 10 тестов в `tests/unit/validators.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
