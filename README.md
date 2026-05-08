# Topic 13 · Exercise 13.2 — Reactive прокси (мини-Vue)

Реализуй упрощённую реактивность на JS Proxy. `reactive(obj)` возвращает прокси, `effect(fn)` запускает функцию и автоматически подписывается на использованные поля. Когда поле меняется — все зависимые effect-ы пересчитываются.

## Что нужно сделать

В `src/reactive.ts`:

1. Глобальный модульный state:
   - `let currentEffect: (() => void) | null = null`
   - `const depsMap = new WeakMap<object, Map<PropertyKey, Set<() => void>>>()`

2. `reactive(target)` возвращает `new Proxy(target, { get, set })`:
   - `get`: если `currentEffect` установлен — добавить в `Set` для (target, prop). Вернуть `Reflect.get(target, prop, receiver)`
   - `set`: записать через `Reflect.set`, потом по копии Set'а вызвать все effect-ы (защита от инфинита — клонируй Set перед обходом)

3. `effect(fn)`:
   - Сохранить старый `currentEffect`, поставить fn
   - Вызвать fn (внутри он обратится к полям и они затрекаются)
   - Восстановить старый currentEffect
   - Вернуть cleanup-функцию: пройти по всем Set'ам в depsMap и удалить fn

## Защита от циклов

Если effect внутри читает И пишет в одно и то же поле, без защиты получится бесконечный цикл. Простейшая защита: при триггере не вызывать effect, который сейчас уже исполняется. Можно проверить `if (e !== currentEffect)`.

## Критерии сдачи

- 9 тестов в `tests/unit/reactive.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
