# Topic 20 · Exercise 20.2 — State через discriminated union

Реализуй стейт-машину заказа на TypeScript-юнионах. Каждое состояние — вариант union с уникальным набором полей. Переходы — функции, которые принимают state + event и возвращают новый state (или кидают на нелегальный переход).

## Что нужно сделать

В `src/order.ts` реализуй 6 функций-переходов:

- `addToCart(state, item)`: только из `cart`; иначе throw. Возвращает новый `cart` с добавленным item
- `startCheckout(state, total)`: только из `cart`
- `pay(state, now)`: только из `checkout`
- `ship(state, trackingId)`: только из `paid`
- `deliver(state, now)`: только из `shipped`
- `cancel(state)`: из `cart`/`checkout`/`paid`. refund = total если был paid, иначе 0. Из `shipped`/`delivered`/`cancelled` — throw

## Главное

В каждой функции на ветке для неподходящего статуса — throw с понятным сообщением. Обычный switch по `state.status` + `default` с throw — стандартный приём.

## Критерии сдачи

- 10 тестов в `tests/unit/order.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
