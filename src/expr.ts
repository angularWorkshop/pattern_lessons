// AST для арифметических выражений через discriminated union.
// Это функциональный аналог Composite — одна структура данных,
// рекурсивные функции вместо методов.

export type Expr =
  | { kind: 'num'; value: number }
  | { kind: 'var'; name: string }
  | { kind: 'binop'; op: '+' | '-' | '*' | '/'; left: Expr; right: Expr };

export type Env = Readonly<Record<string, number>>;
