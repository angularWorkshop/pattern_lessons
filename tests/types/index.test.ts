import { expectTypeOf } from 'vitest';
import { combine, required, type ValidationStrategy } from '../../src/validation-strategy.js';

describe('ValidationStrategy type contracts', () => {
  it('ValidationStrategy<T> is a function returning readonly string[]', () => {
    expectTypeOf<ValidationStrategy<string>>().toEqualTypeOf<(value: string) => readonly string[]>();
  });
  it('combine preserves T', () => {
    const v = combine<string>(required);
    expectTypeOf(v).toEqualTypeOf<ValidationStrategy<string>>();
  });
});
