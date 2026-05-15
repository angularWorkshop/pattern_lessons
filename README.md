# Capstone — Mini Task Tracker

Финальный проект курса. Trello-подобный таск-трекер, где 7 паттернов работают в связке. Цель — не «применить все паттерны ради паттернов», а показать, как они **естественно** делят ответственность.

## Карта паттернов

| Паттерн | Модуль | Ответственность |
|---|---|---|
| **Factory Method** | `src/factory/task-factory.ts` | Создание задач с дефолтами по типу: `createBug` / `createFeature` / `createChore` |
| **State** | `src/state/task-state.ts` | Валидация переходов статуса задачи. Нелегальный — `IllegalTransitionError` |
| **Command** | `src/commands/*` | Каждое мутирующее действие — отдельная команда с `execute/undo`. Стек поддерживает undo/redo |
| **Observer** | `src/observer/event-bus.ts` | Типобезопасный EventBus. Подписчики получают только своё событие |
| **Strategy** | `src/strategy/sort-strategies.ts` | 3 стратегии сортировки: `byDate` / `byPriority` / `byAssignee` |
| **Decorator** | `src/decorator/http-client.ts` | HTTP-клиент: `withLogging` / `withRetry` / `withCache` — собираются цепочкой |
| **Facade** | `src/facade/task-tracker.ts` | Единый сервис `TaskTracker` поверх всего — публичный API |

## Что нужно сделать

Реализуй стабы во всех 7 модулях. Каждый модуль — отдельный паттерн с отдельным набором тестов.

### Порядок работы (рекомендую)

1. **Factory** — `createBug/createFeature/createChore` (легко, разогрев)
2. **State** — `assertTransition` (чистая функция)
3. **Strategy** — `byDate/byPriority/byAssignee` + `priorityRank`
4. **Observer** — `EventBus` (Map<type, Set<listener>>)
5. **Decorator** — `withLogging/withRetry/withCache` (3 независимые функции)
6. **Command** — `CommandStack` + 5 команд (`AddTask/RemoveTask/UpdateTask/MoveTask/RenameTask`)
7. **Facade** — `TaskTracker`, который соединяет всё (добавь команду в стек → выполни → эмитни событие)

## Главные инварианты

- **undo/redo** доказан тестами: после `undo` → `redo` состояние идентично исходному.
- **State**: `moveTask` ДО выполнения команды проверяет переход через `assertTransition`.
- **Observer**: подписчик `task:added` НЕ получает `task:removed` и наоборот.
- **Decorator**: `withCache` со свежим значением НЕ зовёт base. `withRetry` пробрасывает финальную ошибку.
- **Facade**: единственный публичный API. Тесты не должны лезть в `_boardRef()` / `_stackRef()`.

## Критерии сдачи

- 7 тест-файлов в `tests/unit/*` — все зелёные (~40 кейсов суммарно)
- `tests/types/index.test.ts` — публичный API типизирован, нет `any`
- `npm run check` зелёный
- Любые мутации в трекере проходят через `CommandStack` → отменяемы

## Запуск

```bash
npm install
npm run check      # typecheck + vitest
npm test           # только тесты
npm run test:watch # вотчер
```

## Что считаем «сдано»

Каждая фича демонстрирует свой паттерн без размывания:
- `tracker.addTask({type: 'bug', title})` — Factory под капотом
- `tracker.moveTask(id, 'done')` бросает на нелегальный переход — State
- `tracker.undo()` откатывает любое последнее действие — Command
- `tracker.events.on('task:moved', fn)` слушает только moves — Observer
- `tracker.list(byPriority)` — Strategy
- HTTP-клиент с `withLogging(withRetry(withCache(base, ttl), 3), log)` — Decorator
- Весь публичный API — `TaskTracker` — Facade
