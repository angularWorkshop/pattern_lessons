# Topic 11 · Exercise 11.2 — Facade над localStorage · Solution

`Storage` прячет три разные вещи: JSON-сериализацию, версионирование схемы и fallback на in-memory когда основной storage сломался.

## Что нужно сделать

В `src/storage.ts`:

- `set(key, value)`:
  - Сериализуй обёртку `{ v: schemaVersion, d: value }` в JSON
  - Попробуй записать через `this.raw.setItem`
  - Если бросилось исключение — создай `InMemoryRawStorage` в `this.fallback`, выставь `usingFallback = true`, переключи `this.raw` на fallback и повтори запись
- `get(key)`:
  - Прочитай через `this.raw.getItem`
  - Если null → undefined
  - Распарси JSON; если `parsed.v !== schemaVersion` → undefined
  - Иначе верни `parsed.d as T`
- `remove(key)` — `this.raw.removeItem(key)` с тем же fallback'ом

## Главное

Внешний код не должен знать ни про JSON, ни про версионирование, ни про fallback. Снаружи это всё ещё «положи / возьми по ключу». Это и есть Facade — обёртка, которая прячет три разных слоя.

## Критерии сдачи

- 9 тестов в `tests/unit/storage.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
