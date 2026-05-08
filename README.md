# Topic 2 · Exercise 2.1 — Factory Method для уведомлений · Solution

В <code>src/dispatcher.ts</code> сидит классический switch по типу канала. Работает,
но любое добавление нового канала — это правка <code>Dispatcher</code>. И это та самая
история, ради которой существует Factory Method: вынести знание «какой класс создать
для этого ключа» наружу, чтобы вызывающий код не разрастался if-ами.

## Что нужно сделать

1. **Реализовать `NotificationFactory.create(channel)`** в `src/notification-factory.ts`.
   Внутри — `Map<ChannelType, () =&gt; Notification>` с регистрацией всех четырёх
   каналов. Возвращает свежий экземпляр нужного класса.

2. **Добавить `TelegramNotification`** — новый файл `src/telegram-notification.ts`
   с классом, реализующим интерфейс `Notification`. Канал `telegram`. Валидация
   recipient: должен начинаться с `@` (например `@username`).

3. **Зарегистрировать Telegram в фабрике** — одна строка в `NotificationFactory`,
   и больше нигде ничего не трогаем.

4. **Перевести `Dispatcher` на фабрику.** Внутри `dispatch` должно остаться
   что-то вроде:
   ```ts
   const notification = this.factory.create(channel);
   return notification.send(payload);
   ```
   Никакого switch.

5. Не забыть пробросить экспорт `TelegramNotification` через `src/index.ts`.

## Критерии сдачи

- `Dispatcher.dispatch` не содержит switch по каналу
- Добавление нового канала требует только: новый файл с классом + одна строка в фабрике
- Все тесты в `tests/unit/dispatcher.test.ts` зелёные (включая `telegram`)
- Все тесты в `tests/unit/factory.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` проходит без ошибок
