# Topic 4 · Exercise 4.3 — Step Builder с типобезопасностью

Step Builder — это Builder, который трекает обязательные шаги через систему типов. Цель: <code>build()</code> компилируется только когда все обязательные шаги пройдены, иначе TS-ошибка.

## Что нужно сделать

В `src/email-builder.ts` уже описана сигнатура с двумя generic-параметрами и `this`-constraint на `build()`. Реализуй методы:

- `to(address)` — сохранить адрес, вернуть `this as unknown as EmailBuilder<S & { to: true }>`
- `subject(text)` — то же для subject
- `cc(address)` — добавить в массив, вернуть `this`
- `attachment(name, content)` — добавить в массив, вернуть `this`
- `build()` — собрать `EmailMessage`. Сигнатура `this: EmailBuilder<EmailComplete>` гарантирует, что TypeScript не разрешит вызов без обязательных шагов

## Главное

Тип-тесты с `@ts-expect-error` проверяют, что `build()` без `to` или `subject` — TS-ошибка. Если эти assertion'ы перестали падать (TS перестал ругаться) — значит ты сломал step-builder.

## Критерии сдачи

- Все runtime-тесты в `tests/unit/email-builder.test.ts` зелёные (~5 кейсов)
- Тип-тесты в `tests/types/index.test.ts` зелёные — каждый `@ts-expect-error` падает на ожидаемой строке
- `npm run check` зелёный
