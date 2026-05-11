# Topic 16 · Exercise 16.1 — Iterator: async pagination

Реализуй async generator `fetchAllUsers(api)`, который скрывает пагинацию: внешний код пишет `for await ... of` без знания про страницы.

## Что нужно сделать

В `src/pagination.ts`:

```ts
export async function* fetchAllUsers(api: ApiClient): AsyncGenerator<User, void, unknown> {
  let cursor: string | null = null;
  do {
    const page = await api.fetchPage(cursor);
    for (const user of page.users) {
      yield user;
    }
    cursor = page.nextCursor;
  } while (cursor !== null);
}
```

## Главное

- Обращение `for await...of` идёт через `next()` async generator'а
- Это lazy — следующая страница тянется только когда нужен следующий пользователь
- Ранний `break` останавливает генератор, и api больше не вызывается

## Критерии сдачи

- 5 тестов в `tests/unit/pagination.test.ts` зелёные (single page, multi-page, cursors, empty, early break)
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
