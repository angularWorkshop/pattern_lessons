# Topic 10 · Exercise 10.2 — Decorator класса: @cache · Solution

Реализуй TS Stage 3 method decorator `@cache`, который кэширует результаты метода по аргументам. Кэш — отдельный на каждый экземпляр класса.

## Что нужно сделать

В `src/cache-decorator.ts`:

- Сигнатура декоратора Stage 3:
  ```ts
  function cache<T extends object, A extends unknown[], R>(
    originalMethod: (this: T, ...args: A) => R,
    context: ClassMethodDecoratorContext<T, (this: T, ...args: A) => R>
  ): (this: T, ...args: A) => R
  ```
- Внутри: `WeakMap<object, Map<string, R>>`. Ключ args — `JSON.stringify(args)`
- Возвращаемая функция: получить мапу для `this`, проверить ключ, вызвать `originalMethod.call(this, ...args)` если нет, положить в мапу

## Главное

`Calculator.compute` помечен `@cache`. Тесты проверяют что повторные вызовы с теми же аргументами не увеличивают `calls`. Декоратор не меняет сигнатуру метода — TS типы должны сохраняться.

## Критерии сдачи

- 6 тестов в `tests/unit/cache-decorator.test.ts` зелёные
- Тип-контракты сохраняются — `compute` возвращает `number`, `greet` возвращает `string`
- `npm run check` зелёный
