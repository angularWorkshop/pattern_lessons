# Topic 17 · Exercise 17.1 — Mediator: чат-комната · Solution

Реализуй `ChatRoom` — медиатор для общения `ChatUser`'ов. Пользователи не имеют прямых ссылок друг на друга; всё общение идёт через комнату.

## Что нужно сделать

В `src/chat.ts` реализуй методы `ChatRoom`:

- `join(user)` — положить в `Map<name, user>`
- `leave(name)` — удалить из мапы
- `broadcast(from, body)`:
  - если `from` не зарегистрирован → throw
  - доставить всем зарегистрированным, кроме отправителя: `user.receive({ from, to: 'all', body })`
- `send(from, to, body)`:
  - если `from` или `to` не зарегистрирован → throw
  - доставить только адресату: `to.receive({ from, to, body })`

Класс `ChatUser` уже готов — он зовёт `room.broadcast` и `room.send` через свои методы `say` / `whisper`.

## Главное

Пользователь знает только комнату. Тест «no direct list of other users» проверяет, что у пользователя нет поля с массивом других пользователей — это и есть смысл Mediator: один знает всех, остальные — только медиатор.

## Критерии сдачи

- 7 тестов в `tests/unit/chat.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
