# Topic 17 · Exercise 17.2 — Mediator: координатор полей формы · Solution

`Form` — медиатор, реализующий правила зависимостей между полями. Поля не знают друг о друге; вся логика «при смене X сделать Y» живёт в одном месте.

## Что нужно сделать

В `src/form.ts` реализуй `update<K>(field, value)`:

1. **country**: записать в state, выставить `cityOptions` из `CITIES_BY_COUNTRY[value]` (или `[]` если страны нет), обнулить `city = ''`
2. **customerType**:
   - `'business'` → `innVisible = true`, `inn` оставить как есть
   - `'individual'` → `innVisible = false`, `inn = ''`
3. **city**: если значение не из текущего `cityOptions` — throw; иначе записать
4. **остальные** (inn) — просто записать

## Главное

Тест «country change does not affect customerType / inn» проверяет, что правила не пересекаются: смена страны меняет только city/cityOptions. Логика зависимостей живёт в одной функции `update` — это и есть Mediator.

## Критерии сдачи

- 8 тестов в `tests/unit/form.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
