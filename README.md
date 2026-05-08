# Topic 7 · Exercise 7.1 — Adapter для платёжек

Stripe и PayPal — два разных SDK с разными API. Высокоуровневый код не должен знать про их различия. Adapter оборачивает каждый под общий интерфейс `PaymentProvider`.

## Что нужно сделать

В `src/stripe-adapter.ts`:
- `pay(amount, currency)` — звать `sdk.charge`, возвращать `PaymentResult` с `provider: 'stripe'`, `status: 'paid'`, переименовывать поля
- `cancel(id)` — звать `sdk.refund`. Если `refunded === false` → `status: 'failed'`, иначе `'cancelled'`

В `src/paypal-adapter.ts`:
- `pay(amount, currency)` — звать `sdk.createPayment`, мапить state → status (`APPROVED` → `paid`, `CANCELLED` → `cancelled`, `FAILED` → `failed`)
- `cancel(id)` — звать `sdk.cancelPayment`, тоже мапить state

## Главное

Адаптер не меняет логику — только переименовывает поля и приводит SDK к единому контракту. Высокоуровневый код потом просто берёт `PaymentProvider` и пользуется одинаково.

## Критерии сдачи

- 7+ тестов в `tests/unit/adapters.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные (оба адаптера совместимы с `PaymentProvider`)
- `npm run check` зелёный
