# Topic 23 · Exercise 23.2 — Классический Visitor (для сравнения)

Реализуй классический Visitor с двойной диспетчеризацией. Сравни с 23.1 (discriminated union) — там код проще, но эта версия открытая: новый visitor добавляется не трогая узлы.

## Что нужно сделать

В `src/visitor.ts`:

**accept() в каждом узле** — двойная диспетчеризация:
- `NumNode.accept(v)` → `v.visitNum(this)`
- `VarNode.accept(v)` → `v.visitVar(this)`
- `BinOpNode.accept(v)` → `v.visitBinOp(this)`

**Evaluator implements Visitor<number>**:
- `visitNum(n)` → `n.value`
- `visitVar(n)` → `this.env[n.name]` или throw
- `visitBinOp(n)` → `n.left.accept(this)` + `n.right.accept(this)` + применить `n.op`

**Printer implements Visitor<string>**:
- `visitNum` → `String(n.value)`
- `visitVar` → `n.name`
- `visitBinOp` → `"(${left.accept(this)} ${op} ${right.accept(this)})"`

## Главное

Тест «adding a new visitor does not touch nodes» проверяет, что можно добавить новый класс-визитор (например Depth) без правки NumNode/VarNode/BinOpNode. Открытость к новым операциям — главное достоинство классического Visitor.

## Критерии сдачи

- 7 тестов в `tests/unit/visitor.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
