# Topic 3 · Exercise 3.2 — Abstract Factory: тёмная и светлая темы · Solution

Один и тот же `LoginForm` рендерится в светлой и тёмной теме, не зная какие именно классы под капотом. Все шесть UI-компонентов (по три на тему) — стабы. Реализовать так, чтобы фабрика давала «семью» компонентов с одинаковым визуальным контекстом.

## Что нужно сделать

- `LightButton.render(label)` → `{ tag: 'button', className: 'btn btn--light', text: label, theme: 'light' }`
- `LightInput.render(placeholder)` → `{ tag: 'input', className: 'input input--light', text: placeholder, theme: 'light' }`
- `LightCard.render(title, body)` → `{ tag: 'div', className: 'card card--light', text: '<title> :: <body>', theme: 'light' }`
- Для тёмной темы — то же, только `--dark` в `className` и `theme: 'dark'`

## Главное

`LoginForm` уже работает — он знает только про `ThemeFactory`, не импортирует ни `LightButton`, ни `DarkInput`. Это и есть смысл Abstract Factory: высокоуровневый код выбирает «семью» один раз сверху, дальше всё что выдаёт фабрика — гарантированно одного стиля.

## Критерии сдачи

- Все тесты в `tests/unit/factory.test.ts` зелёные (~9 кейсов)
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` проходит
