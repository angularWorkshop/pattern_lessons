# Topic 18 · Exercise 18.1 — Memento: автосейв документа

Реализуй снапшоты состояния через паттерн Memento. `TextDocument` (Originator) умеет создавать снимок и восстанавливаться из него. `Caretaker` хранит коллекцию снимков.

## Что нужно сделать

В `src/memento.ts`:

- `TextDocument.save(now)` — создать `DocumentSnapshot` с глубокой копией `state` (используй `structuredClone`) и `takenAt = now`
- `TextDocument.restore(snapshot)` — записать `state` из снимка, тоже через `structuredClone`, чтобы внешние мутации снимка после restore не ломали документ
- `Caretaker.capture(doc, now)` — `doc.save(now)`, положить в массив
- `Caretaker.at(i)` — на out-of-range throw, иначе вернуть снимок
- `Caretaker.restoreTo(doc, i)` — взять снимок по индексу, вызвать `doc.restore(snap)`

## Главное

Тесты «immune to subsequent mutations» и «mutating the snapshot after restore» проверяют, что между Originator и Memento стоит барьер из клонирования. Без этого паттерн ломается.

## Критерии сдачи

- 8 тестов в `tests/unit/memento.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
