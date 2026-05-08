# Topic 6 · Exercise 6.1 — Singleton тремя способами · Solution

Реализовать одинаковый по поведению Logger в трёх вариантах: классический singleton с приватным конструктором, модульный singleton через closure, обычный класс под DI. Цель — ощутить разницу между подходами и понять, какой самый удобный для тестов.

## Что нужно сделать

В `src/class-logger.ts`:
- `private constructor()` — нельзя создать снаружи
- `static getInstance()` — лениво создаёт инстанс, потом возвращает тот же
- `static reset()` — для тестов, обнуляет instance в `null`
- `log(level, message)` — пушит `{ level, message, timestamp: Date.now() }` в `entries`

В `src/module-logger.ts`:
- В closure заводим массив `entries` и timestamp при логе
- Возвращаем объект с `log` / `getEntries` / `reset`

В `src/di-logger.ts`:
- Обычный класс без singleton-обвязки. Каждый `new DiLogger()` — независим
- Singleton-scope обеспечивается на уровне сборки приложения (DI-контейнер)

## Критерии сдачи

- 9+ тестов в `tests/unit/loggers.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные (все три реализуют `Logger`)
- `npm run check` зелёный

## Думать в процессе

После реализации сравни три варианта в тестах. Какой проще тестировать без `beforeEach` с `reset()`? Какой не нужно «изолировать» вообще? Это и есть ответ на вопрос «почему DI лучше singleton».
