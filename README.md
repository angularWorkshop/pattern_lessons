# Topic 21 · Exercise 21.2 — Strategy: расчёт цены корзины · Solution

Реализуй три стратегии расчёта цены и интегрируй их в Cart. Стратегия — это просто функция `(cart) => PriceBreakdown`. Cart.calculate делегирует расчёт стратегии.

## Что нужно сделать

В `src/pricing.ts`:

- `guestStrategy`:
  - `subtotal = cart.subtotal()`
  - `discount = 0`
  - `shipping = subtotal > 0 ? 10 : 0`
  - `total = subtotal + shipping`
- `memberStrategy`:
  - 5% скидка: `discount = subtotal * 0.05`
  - `shipping = 10` (если subtotal > 0)
  - `total = subtotal - discount + shipping`
- `premiumStrategy`:
  - 10% скидка
  - бесплатная доставка: `shipping = 0`
  - `total = subtotal - discount`

## Главное

Cart.calculate не знает, какая стратегия передана — просто делегирует. Добавить новую стратегию = новая функция, без правки Cart.

## Критерии сдачи

- 8 тестов в `tests/unit/pricing.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
