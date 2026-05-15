# Topic 23 · Exercise 23.1 — Visitor через discriminated union

Реализуй три операции (evaluate, prettyPrint, collectVars) над одним AST через exhaustive switch. Это идиоматичный TS-аналог Visitor: данные и операции разделены, новые операции добавляются без правки узлов.

## Что нужно сделать

В `src/ast.ts`:

- `evaluate(node, env)`:
  - switch по `node.kind`
  - `num` → `node.value`
  - `var` → `env[node.name]` или throw с упоминанием name
  - `binop` → рекурсивно вычислить left/right, применить op. На `/` 0 — throw
  - default — `const _: never = node; throw ...` (exhaustive check)

- `prettyPrint(node)`:
  - `num` → `String(node.value)`
  - `var` → `node.name`
  - `binop` → `"(${prettyPrint(left)} ${op} ${prettyPrint(right)})"`

- `collectVars(node)`:
  - вспомогательная рекурсия с Set
  - `num` → ничего; `var` → добавить name; `binop` → обойти left/right
  - вернуть `[...set]`

## Главное

Добавление нового операции — новый файл с функцией, никаких правок типа `Expr`. Это и есть преимущество union-Visitor: операции открыты для расширения, типы — закрыты.

## Критерии сдачи

- 11 тестов в `tests/unit/ast.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
