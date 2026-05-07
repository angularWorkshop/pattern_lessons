# Topic 1 · Exercise 1.1 — Распилить божественный класс (SRP) · Solution

В `src/order-service.ts` лежит класс `OrderService`, который умеет делать всё сразу:
валидировать, считать скидки, сохранять в хранилище, слать письма и собирать инвойс.
Тесты в `tests/unit/integration.test.ts` показывают, что снаружи он работает —
но внутри это пять разных причин для изменений в одном классе.

## Цель

Применить **Single Responsibility Principle**: вынести каждую обязанность в свой класс,
а `OrderService` оставить координатором, который только связывает их.

## Что нужно сделать

1. Реализовать пять стаб-классов — сейчас все их методы кидают «not implemented»:
   - `src/order-validator.ts` — `validate(order)` бросает на: пустых items, кривом email
     (без `@`), не положительных `price` или `quantity`.
   - `src/discount-calculator.ts` — `calculate(order)` возвращает
     `{ subtotal, discount, total }`. Скидка: `premium` = 10%, `member` = 5%,
     `guest` = 0. Итог округляется до 2 знаков.
   - `src/order-repository.ts` — `save(order)` и `find(id)` через внутренний `Map`.
   - `src/email-notifier.ts` — `send(to, body)` складывает письмо в массив,
     `getSent()` возвращает его как `readonly`.
   - `src/invoice-generator.ts` — `generate(order, total)` собирает строку инвойса
     по тому же формату, что и сейчас в `OrderService.placeOrder`.
2. Перевести `OrderService` на инъекцию зависимостей. Конструктор уже принимает
   `OrderServiceDeps`, но игнорирует их. Сохранить переданных коллабораторов на
   `this`, при отсутствии — создавать дефолтные. В `placeOrder` использовать их
   вместо встроенной логики.
3. Локально убедиться, что все тесты зелёные:
   ```bash
   npm run check
   ```

## Критерии сдачи

- `OrderService.placeOrder` ничего не делает сам, только зовёт коллабораторов
- Каждый из пяти классов отвечает за одну вещь
- Все тесты в `tests/unit/integration.test.ts`, `tests/unit/srp.test.ts`,
  `tests/types/index.test.ts` зелёные
- `npm run check` проходит без ошибок
