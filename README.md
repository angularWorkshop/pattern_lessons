# Topic 10 · Exercise 10.3 — Decorator factory: @measure

Реализуй TS Stage 3 decorator factory `@measure(reporter)`, измеряющую время выполнения метода. Должна работать на sync, async и при ошибках.

## Что нужно сделать

В `src/measure-decorator.ts`:

- `measure(reporter)` — фабрика. Принимает функцию `Reporter`, возвращает декоратор
- Возвращаемый декоратор имеет стандартную Stage 3 сигнатуру `(originalMethod, context) => replacement`
- Внутри замены:
  - засечь `Date.now()` до вызова
  - вызвать `originalMethod.call(this, ...args)`
  - если результат — Promise, дождаться через `.then(...).catch(...)`
  - на успехе — `reporter({ method, durationMs, ok: true })`, вернуть результат
  - на ошибке — `reporter({ method, durationMs, ok: false })`, пробросить
- `method` берётся из `context.name` (приведением к string)

## Подсказка для async

Проще всего — проверить `result instanceof Promise`. Если да — прицепить `.then(value => { reporter(ok); return value }).catch(err => { reporter(fail); throw err })`. Если нет — отчитаться сразу и вернуть.

## Критерии сдачи

- 6 тестов в `tests/unit/measure-decorator.test.ts` зелёные
- Тип-контракты сохраняются
- `npm run check` зелёный
