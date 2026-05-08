import { evaluate } from '../../src/evaluate.js';
import { prettyPrint } from '../../src/pretty-print.js';
import type { Expr } from '../../src/expr.js';

const num = (value: number): Expr => ({ kind: 'num', value });
const v = (name: string): Expr => ({ kind: 'var', name });
const op = (op: '+' | '-' | '*' | '/', left: Expr, right: Expr): Expr => ({
  kind: 'binop',
  op,
  left,
  right,
});

describe('evaluate — recursive walk through the AST', () => {
  it('returns a literal number', () => {
    expect(evaluate(num(7), {})).toBe(7);
  });
  it('reads a variable from the environment', () => {
    expect(evaluate(v('x'), { x: 42 })).toBe(42);
  });
  it('throws for unknown variable', () => {
    expect(() => evaluate(v('missing'), {})).toThrow(/missing/);
  });
  it('adds two numbers', () => {
    expect(evaluate(op('+', num(2), num(3)), {})).toBe(5);
  });
  it('handles all four arithmetic operations', () => {
    expect(evaluate(op('-', num(10), num(4)), {})).toBe(6);
    expect(evaluate(op('*', num(6), num(7)), {})).toBe(42);
    expect(evaluate(op('/', num(20), num(5)), {})).toBe(4);
  });
  it('throws on division by zero', () => {
    expect(() => evaluate(op('/', num(1), num(0)), {})).toThrow(/division/i);
  });
  it('handles nested expressions', () => {
    // (2 + x) * 3 with x=4 → 18
    const expr = op('*', op('+', num(2), v('x')), num(3));
    expect(evaluate(expr, { x: 4 })).toBe(18);
  });
});

describe('prettyPrint — infix output with parens around binops', () => {
  it('prints a number', () => {
    expect(prettyPrint(num(5))).toBe('5');
  });
  it('prints a variable', () => {
    expect(prettyPrint(v('x'))).toBe('x');
  });
  it('prints a flat binop', () => {
    expect(prettyPrint(op('+', num(1), num(2)))).toBe('(1 + 2)');
  });
  it('prints a nested binop', () => {
    const expr = op('*', op('+', num(2), v('x')), num(3));
    expect(prettyPrint(expr)).toBe('((2 + x) * 3)');
  });
});
