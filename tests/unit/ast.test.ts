import { evaluate, prettyPrint, collectVars, type Expr } from '../../src/ast.js';

const num = (value: number): Expr => ({ kind: 'num', value });
const v = (name: string): Expr => ({ kind: 'var', name });
const op = (op: '+' | '-' | '*' | '/', left: Expr, right: Expr): Expr => ({
  kind: 'binop',
  op,
  left,
  right,
});

describe('evaluate', () => {
  it('numbers', () => {
    expect(evaluate(num(7), {})).toBe(7);
  });
  it('variables resolve from env', () => {
    expect(evaluate(v('x'), { x: 42 })).toBe(42);
  });
  it('unknown variable throws', () => {
    expect(() => evaluate(v('missing'), {})).toThrow(/missing/);
  });
  it('binops compute', () => {
    expect(evaluate(op('+', num(2), num(3)), {})).toBe(5);
    expect(evaluate(op('*', num(6), num(7)), {})).toBe(42);
  });
  it('division by zero throws', () => {
    expect(() => evaluate(op('/', num(1), num(0)), {})).toThrow(/division/i);
  });
  it('nested expression: (2 + x) * 3 with x=4 = 18', () => {
    const expr = op('*', op('+', num(2), v('x')), num(3));
    expect(evaluate(expr, { x: 4 })).toBe(18);
  });
});

describe('prettyPrint', () => {
  it('numbers and variables', () => {
    expect(prettyPrint(num(5))).toBe('5');
    expect(prettyPrint(v('x'))).toBe('x');
  });
  it('flat binop', () => {
    expect(prettyPrint(op('+', num(1), num(2)))).toBe('(1 + 2)');
  });
  it('nested binop', () => {
    const expr = op('*', op('+', num(2), v('x')), num(3));
    expect(prettyPrint(expr)).toBe('((2 + x) * 3)');
  });
});

describe('collectVars — second operation on the same AST', () => {
  it('finds a single var', () => {
    expect(collectVars(v('x'))).toEqual(['x']);
  });
  it('returns empty for a pure number tree', () => {
    expect(collectVars(op('+', num(1), num(2)))).toEqual([]);
  });
  it('deduplicates repeated vars', () => {
    const expr = op('+', v('x'), op('*', v('x'), v('y')));
    expect(new Set(collectVars(expr))).toEqual(new Set(['x', 'y']));
  });
});
