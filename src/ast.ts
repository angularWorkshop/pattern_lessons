// AST для арифметики через discriminated union.
// Это идиоматичный TS-аналог Visitor: операции — функции с exhaustive switch.

export type Expr =
  | { kind: 'num'; value: number }
  | { kind: 'var'; name: string }
  | { kind: 'binop'; op: '+' | '-' | '*' | '/'; left: Expr; right: Expr };

export type Env = Readonly<Record<string, number>>;

// TODO: evaluate(node, env).
// switch (node.kind):
//   num   → node.value
//   var   → env[node.name] || throw
//   binop → evaluate(left) op evaluate(right), на 0 при '/' — throw
// default — const _: never = node, throw для exhaustive проверки.
export function evaluate(_node: Expr, _env: Env): number {
  throw new Error('evaluate is not implemented yet');
}

// TODO: prettyPrint(node).
// num   → String(node.value)
// var   → node.name
// binop → `(${prettyPrint(left)} ${op} ${prettyPrint(right)})`
export function prettyPrint(_node: Expr): string {
  throw new Error('prettyPrint is not implemented yet');
}

// TODO: collectVars(node) — собрать все имена переменных, в которых появляется var.
// Возвращает массив уникальных строк (Set → Array).
export function collectVars(_node: Expr): readonly string[] {
  throw new Error('collectVars is not implemented yet');
}
