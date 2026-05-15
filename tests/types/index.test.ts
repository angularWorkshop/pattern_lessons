import { expectTypeOf } from 'vitest';
import { pipeline } from '../../src/pipeline.js';

describe('pipeline type contracts', () => {
  it('infers final type from the last step', () => {
    const fn = pipeline(
      (s: string) => s.length,
      (n: number) => n > 0,
    );
    expectTypeOf(fn).parameters.toEqualTypeOf<[string]>();
    expectTypeOf(fn).returns.toEqualTypeOf<boolean>();
  });

  it('single-step pipeline keeps signature', () => {
    const fn = pipeline((n: number) => `${n}`);
    expectTypeOf(fn).parameters.toEqualTypeOf<[number]>();
    expectTypeOf(fn).returns.toEqualTypeOf<string>();
  });
});
