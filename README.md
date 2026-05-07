# Topic 1 · Exercise 1.2 — DIP через интерфейс UserRepository · Solution

`UserService` сейчас намертво завязан на конкретный `PostgresUserRepository`.
В тестах это мешает: на проде нужен реальный Postgres, а тестов без БД у нас не получится.
Задача — применить **Dependency Inversion Principle**: ввести интерфейс
`UserRepository`, переписать `UserService` так, чтобы он зависел от интерфейса,
и подставить в тесты `InMemoryUserRepository`.

## Что нужно сделать

1. **Дополнить интерфейс** в `src/user-repository.ts`. Сейчас в нём объявлен только
   `save`. Добавь `findById`, `findByEmail`, `findByRole` — все async, типы
   совпадают с тем, что уже умеет `PostgresUserRepository`.

2. **Реализовать `InMemoryUserRepository`** в `src/in-memory-user-repository.ts`.
   Все четыре метода — над одним `Map<string, User>`, ключ — `id`.
   `findByEmail` и `findByRole` — линейный поиск по значениям мапы.

3. **Перевести `UserService` на интерфейс** в `src/user-service.ts`:
   - конструктор принимает `repository: UserRepository`
   - поле `repo` имеет тип `UserRepository`
   - конкретный `PostgresUserRepository` импортировать больше не надо

4. **Убедись, что `PostgresUserRepository` тоже реализует интерфейс** — повесь
   `implements UserRepository` (если ещё нет). Если методы расходятся — поправить
   так, чтобы оба класса были взаимозаменяемы.

5. Локально проверить: `npm run check` зелёный.

## Критерии сдачи

- `UserService` не знает про `PostgresUserRepository` (нет import'а)
- В `UserService` тип поля и конструкторного параметра — `UserRepository`
- `InMemoryUserRepository` и `PostgresUserRepository` оба `implements UserRepository`
- Тесты в `tests/unit/user-service.test.ts` зелёные через `InMemoryUserRepository`
- Тесты в `tests/unit/in-memory-repository.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
