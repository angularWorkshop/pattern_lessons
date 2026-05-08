# Topic 13 · Exercise 13.1 — Proxy: lazy-loading

`createLazy(factory)` возвращает прокси-объект, у которого тяжёлая инициализация откладывается до первого реального обращения. Снаружи объект «уже готов», а на самом деле фабрика ещё не вызвана.

## Что нужно сделать

В `src/lazy-proxy.ts`:

- Реализуй `createLazy<T>(factory)` через встроенный `Proxy`
- Локальная переменная `cached: T | null = null` в closure
- Возвращай `new Proxy({} as T, { get(target, prop) { ... } })`:
  - Если `cached === null` — вызвать `factory()` и сохранить
  - Вернуть `(cached as Record<...>)[prop]`
- Для метода: если результат — функция, надо привязать `this`: `typeof value === 'function' ? value.bind(cached) : value`

## Главное

Тест `factory is NOT called on createLazy()` проверяет, что создание прокси никого не инициализирует. `factory IS called on first property access` — что после первого `lazy.id` фабрика вызывается. `factory is NOT called twice` — кэш работает.

## Критерии сдачи

- 6 тестов в `tests/unit/lazy-proxy.test.ts` зелёные
- Тип `createLazy(() => X)` возвращает `X`
- `npm run check` зелёный
