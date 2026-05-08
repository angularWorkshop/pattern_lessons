# Topic 3 · Exercise 3.1 — Abstract Factory: семейства БД-объектов

В `src/postgres-factory.ts` и `src/sqlite-factory.ts` лежат фабрики для двух СУБД.
Каждая создаёт три связанных объекта: `Connection`, `QueryRunner`, `Transaction`.
Сейчас все методы продуктов кидают «not implemented». Задача — реализовать их,
сохранив главное правило **Abstract Factory**: объекты внутри одной семьи
работают только друг с другом.

## Что нужно сделать

1. **Реализовать Postgres-семью**:
   - `PostgresConnection.open/close/isOpen` — `_open` flag, `open()` ставит `true`, `close()` — `false`
   - `PostgresQueryRunner.run(conn, sql)` — вернуть `[{ engine: 'postgres', sql }]`. **Если `conn.engine !== 'postgres'`** — кинуть ошибку с упоминанием engine
   - `PostgresTransaction.begin(conn)` — проверить engine, выставить `isActive = true`. `commit/rollback` — снять флаг

2. **Реализовать Sqlite-семью** — те же три класса, та же логика, только `engine: 'sqlite'`

3. **Cross-engine защита** — это главное в Abstract Factory. PostgresQueryRunner на SqliteConnection должен падать с понятной ошибкой, и наоборот

## Критерии сдачи

- Все тесты в `tests/unit/factory.test.ts` зелёные (12 кейсов: внутри-семьи + cross-engine)
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` проходит без ошибок
