# Topic 8 · Exercise 8.1 — Bridge: уведомления × каналы · Solution

Тип уведомления (Alert/Marketing/Reminder) — абстракция. Канал доставки (Email/SMS/Push) — реализация. Bridge = обе иерархии растут независимо. M × N комбинаций реализуются M + N классов.

## Что нужно сделать

В `src/channels.ts`:
- `EmailChannel.send(to, body)` → `{ channel: 'email', to, body, delivered: true }`
- `SmsChannel.send(to, body)` → то же, но `body` обрезается до 160 символов
- `PushChannel.send(to, body)` → `body` оборачивается в `PUSH: <body>`

В `src/notifications.ts`:
- `AlertNotification.notify(recipient, content)` → `channel.send(recipient, '[ALERT] ' + content)`
- `MarketingNotification.notify` → `content + ' — unsubscribe at example.com/unsubscribe'`
- `ReminderNotification.notify` → `'Reminder: ' + content`

## Главное

Базовый класс `Notification` уже хранит `channel: DeliveryChannel`. Тебе остаётся реализовать `notify` в каждом наследнике — отформатировать сообщение и передать в `this.channel.send`.

## Критерии сдачи

- 8 тестов в `tests/unit/bridge.test.ts` зелёные (3 канала + 4 комбинации + composition)
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
