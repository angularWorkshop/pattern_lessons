# Topic 4 · Exercise 4.2 — Builder для HTTP-запроса · Solution

Сделать fluent-builder, собирающий объект `HttpRequest`. Метод HTTP, путь и опциональные шаги (заголовки, query, body) — каждое выставляется отдельным методом цепочки. Финальный `build()` валидирует и возвращает готовый объект.

## Что нужно сделать

В `src/http-builder.ts` реализовать все методы:

- `get/post/put/delete` — выставляют `method`, возвращают `this`
- `path(p)` — путь
- `header(name, value)` — добавляет/перезаписывает заголовок
- `queryParam(name, value)` — добавляет/перезаписывает query
- `body(payload)` — выставляет тело
- `build()` — собирает `HttpRequest`. Валидации:
  - `method` должен быть выставлен (иначе кидаем с упоминанием `method`)
  - `path` должен быть выставлен (иначе кидаем с упоминанием `path`)
  - `body` нельзя устанавливать на `GET` и `DELETE` (иначе кидаем с упоминанием `body`)

## Критерии сдачи

- Все тесты в `tests/unit/http-builder.test.ts` зелёные (~10 кейсов)
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
