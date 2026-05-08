import { expectTypeOf } from 'vitest';
import { promisify } from '../../src/promisify.js';

describe('promisify type contracts', () => {
  it('returns a function with the same args (sans callback) returning Promise<R>', () => {
    const fn = (a: number, b: number, cb: (err: Error | null, r?: string) => void): void => cb(null, `${a + b}`);
    const wrapped = promisify(fn);
    expectTypeOf(wrapped).parameters.toEqualTypeOf<[number, number]>();
    expectTypeOf(wrapped).returns.toEqualTypeOf<Promise<string>>();
  });

  it('zero-arg case', () => {
    const fn = (cb: (err: Error | null, r?: number) => void): void => cb(null, 1);
    const wrapped = promisify(fn);
    expectTypeOf(wrapped).parameters.toEqualTypeOf<[]>();
    expectTypeOf(wrapped).returns.toEqualTypeOf<Promise<number>>();
  });
});
