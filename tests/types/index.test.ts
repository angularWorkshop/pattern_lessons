import { expectTypeOf } from 'vitest';
import { Calculator } from '../../src/calculator.js';

describe('@cache preserves method signatures', () => {
  it('compute returns number', () => {
    expectTypeOf(Calculator.prototype.compute).returns.toEqualTypeOf<number>();
    expectTypeOf(Calculator.prototype.compute).parameters.toEqualTypeOf<[number, number]>();
  });
  it('greet returns string', () => {
    expectTypeOf(Calculator.prototype.greet).returns.toEqualTypeOf<string>();
    expectTypeOf(Calculator.prototype.greet).parameters.toEqualTypeOf<[string]>();
  });
});
