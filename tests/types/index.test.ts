import { expectTypeOf } from 'vitest';
import { evaluate } from '../../src/evaluate.js';
import { prettyPrint } from '../../src/pretty-print.js';
import type { Env, Expr } from '../../src/expr.js';

describe('AST type contracts', () => {
  it('Expr is the expected discriminated union', () => {
    expectTypeOf<Expr>().toEqualTypeOf<
      | { kind: 'num'; value: number }
      | { kind: 'var'; name: string }
      | { kind: 'binop'; op: '+' | '-' | '*' | '/'; left: Expr; right: Expr }
    >();
  });
  it('evaluate takes Expr and Env, returns number', () => {
    expectTypeOf(evaluate).parameters.toEqualTypeOf<[Expr, Env]>();
    expectTypeOf(evaluate).returns.toEqualTypeOf<number>();
  });
  it('prettyPrint takes Expr, returns string', () => {
    expectTypeOf(prettyPrint).parameters.toEqualTypeOf<[Expr]>();
    expectTypeOf(prettyPrint).returns.toEqualTypeOf<string>();
  });
});
