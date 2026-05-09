import { expectTypeOf } from 'vitest';
import { chain, type ValidationResult, type Validator } from '../../src/validators.js';

describe('Validator chain type contracts', () => {
  it('Validator<T> takes value and next', () => {
    expectTypeOf<Validator<string>>().parameters.toEqualTypeOf<
      [string, () => Promise<ValidationResult>]
    >();
  });

  it('chain returns (T) => Promise<ValidationResult>', () => {
    const validate = chain<string>([]);
    expectTypeOf(validate).parameters.toEqualTypeOf<[string]>();
    expectTypeOf(validate).returns.toEqualTypeOf<Promise<ValidationResult>>();
  });

  it('ValidationResult is a discriminated union', () => {
    expectTypeOf<ValidationResult>().toEqualTypeOf<
      { ok: true } | { ok: false; field: string; reason: string }
    >();
  });
});
