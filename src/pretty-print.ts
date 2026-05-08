import type { Expr } from './expr.js';

// TODO: вывести выражение в инфиксной нотации.
// num → "value"
// var → name
// binop → "(left op right)" — со скобками вокруг каждого binop, чтобы
// результат всегда был однозначным без правил приоритета.
export function prettyPrint(_node: Expr): string {
  throw new Error('prettyPrint is not implemented yet');
}
