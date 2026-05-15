import { expectTypeOf } from 'vitest';
import { evaluate, prettyPrint, collectVars, type Env, type Expr } from '../../src/ast.js';

describe('AST type contracts', () => {
  it('evaluate takes Expr + Env, returns number', () => {
    expectTypeOf(evaluate).parameters.toEqualTypeOf<[Expr, Env]>();
    expectTypeOf(evaluate).returns.toEqualTypeOf<number>();
  });
  it('prettyPrint takes Expr, returns string', () => {
    expectTypeOf(prettyPrint).parameters.toEqualTypeOf<[Expr]>();
    expectTypeOf(prettyPrint).returns.toEqualTypeOf<string>();
  });
  it('collectVars returns readonly string[]', () => {
    expectTypeOf(collectVars).returns.toEqualTypeOf<readonly string[]>();
  });
});
