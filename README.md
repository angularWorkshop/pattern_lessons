# Topic 19 · Exercise 19.1 — Observer: типизированный EventEmitter · Solution

Реализуй `EventEmitter<Events>` с типизированными именами событий и аргументами. Передал не тот тип в `emit` — ошибка компилятора.

## Что нужно сделать

В `src/emitter.ts`:

- Внутри — `Map<keyof Events, Set<Listener>>`
- `on(name, listener)` — найти/создать Set, добавить listener
- `off(name, listener)` — удалить из Set
- `once(name, listener)` — обернуть listener: вызвать оригинал, потом `this.off(name, wrapper)`
- `emit(name, ...args)` — пройтись по копии Set (`[...set]`), чтобы новые подписки внутри listener'а не попадали в текущий проход

## Главное

Тест «does not run listeners added during the current emit» — ключевой. Копируй Set перед обходом, иначе будут двойные вызовы или бесконечная рекурсия.

## Критерии сдачи

- 7 тестов в `tests/unit/emitter.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные (передача неверного типа в emit — ошибка компиляции)
- `npm run check` зелёный
