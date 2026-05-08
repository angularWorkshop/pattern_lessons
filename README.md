# Topic 9 · Exercise 9.1 — Composite: файловая система

`File` и `Folder` реализуют общий интерфейс `FsNode`. Любая операция (размер, поиск) работает одинаково и на одном файле, и на дереве файлов.

## Что нужно сделать

В `src/fs-node.ts`:

- `File.getTotalSize()` — возвращает свой размер
- `File.findByName(name)` — `[this]` если имя совпадает, иначе `[]`
- `Folder.getTotalSize()` — сумма размеров всех детей рекурсивно
- `Folder.findByName(name)` — собирает ВСЕ совпадения в дереве. Если имя самой папки совпадает — папка тоже идёт в результат, плюс рекурсивно по детям

## Главное

`Folder.getTotalSize()` использует `child.getTotalSize()` для каждого ребёнка, не различая `File` и `Folder`. В этом и смысл Composite — единый интерфейс для листа и группы.

## Критерии сдачи

- 11 тестов в `tests/unit/composite.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
