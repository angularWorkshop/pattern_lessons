# Topic 22 · Exercise 22.2 — Template Method функционально: pipeline

То же самое, что в 22.1, но без классов и наследования. Скелет «вызвать шаги по порядку» становится универсальной функцией `pipeline(...steps)`. Шаги передаются массивом; TypeScript проверяет, что выход каждого шага = вход следующего.

## Что нужно сделать

В `src/pipeline.ts`:

- Реализация (рантайм) — одна строка: `steps.reduce((acc, step) => step(acc), value)`
- Сигнатуры (overloads) уже описаны для 1, 2, 3, 4 шагов; нужно реализовать тело функции
- Реализационная сигнатура — `(...steps: ((value: unknown) => unknown)[]) => (value: unknown) => unknown` — внутри используется приведение типов, но overloads дают типобезопасный наружный API

## Подсказка

```ts
export function pipeline(...steps: ((v: unknown) => unknown)[]) {
  return (value: unknown) => steps.reduce((acc, step) => step(acc), value);
}
```

## Критерии сдачи

- 5 runtime-тестов в `tests/unit/pipeline.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные (типы аргументов выводятся, тип результата — последний шаг)
- `npm run check` зелёный
