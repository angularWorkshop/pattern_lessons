import type { Env, Expr } from './expr.js';

// TODO: реализовать через exhaustive switch по node.kind.
// num — вернуть value.
// var — взять из env. Если ключа нет — кинуть ошибку с упоминанием name.
// binop — вычислить left/right, применить op. Деление на 0 — ошибка.
//
// В default-ветке — `const _exhaustive: never = node` и throw,
// чтобы при добавлении нового вида узла TypeScript ругался здесь.
export function evaluate(_node: Expr, _env: Env): number {
  throw new Error('evaluate is not implemented yet');
}
