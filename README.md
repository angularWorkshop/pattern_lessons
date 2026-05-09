# Topic 15 · Exercise 15.1 — Command: undo/redo

Реализуй `CommandStack` — стек команд с undo/redo. Каждая команда знает, как себя выполнить и откатить.

## Что нужно сделать

В `src/command.ts` реализуй методы `CommandStack`:

- `run(cmd)`:
  - вызвать `cmd.execute()`
  - добавить `cmd` в `undoStack`
  - очистить `redoStack`
- `undo()`:
  - на пустом стеке — `throw`
  - вытащить из `undoStack`, позвать `.undo()`, положить в `redoStack`
- `redo()`:
  - на пустом стеке — `throw`
  - вытащить из `redoStack`, позвать `.execute()`, положить в `undoStack`

Команды (`IncrementCommand`, `DecrementCommand`, `SetTextCommand`) уже реализованы — посмотри как они трекают предыдущее значение для undo.

## Главное

Каждая команда отвечает за свой откат. `CommandStack` ничего не знает о деталях — он только звонит `execute()`/`undo()`. Это позволяет добавить новый тип команд без правок стека.

## Критерии сдачи

- 9 тестов в `tests/unit/command.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
