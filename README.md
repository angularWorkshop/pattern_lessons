# Topic 12 · Exercise 12.1 — Flyweight: виртуализированный список · Solution

`VirtualList` показывает 100 000 элементов, но в памяти держит только ~viewportSize нод. При прокрутке существующие ноды переиспользуются с новым контентом. Это и есть Flyweight на практике: разделение «общей» части (нода) и «контекстной» (item, который она показывает прямо сейчас).

## Что нужно сделать

В `src/virtual-list.ts` реализуй `scrollTo(offset)`:

- Считать диапазон видимых индексов: `[offset, min(offset + viewportSize, items.length))`
- Для каждого видимого индекса `i`:
  - Взять i-й слот пула. Если ещё нет — создать новый узел с инкрементом `nextNodeId` и `totalNodesCreated`
  - Записать `items[i]` в слот, `i` как currentIndex
  - Положить в результат `{ nodeId, item, index }`
- Размер пула не должен превышать `viewportSize`

## Главное

Каждая нода — это «flyweight»: общая часть (id ноды) переиспользуется, контекстная часть (item, index) меняется при прокрутке. Тест `node ids are stable across scrolls` проверяет именно это — после второго scroll'а массив node ids остаётся прежним, хотя items другие.

## Критерии сдачи

- 7 тестов в `tests/unit/virtual-list.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
- `getTotalNodesCreated()` после полного обхода списка ≤ viewportSize
