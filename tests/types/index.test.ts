import { expectTypeOf } from 'vitest';
import { deepClone } from '../../src/deep-clone.js';

describe('deepClone type contract', () => {
  it('returns the same type as the input', () => {
    expectTypeOf(deepClone({ a: 1 })).toEqualTypeOf<{ a: number }>();
    expectTypeOf(deepClone([1, 2, 3])).toEqualTypeOf<number[]>();
    expectTypeOf(deepClone(new Date())).toEqualTypeOf<Date>();
    expectTypeOf(deepClone(new Map<string, number>())).toEqualTypeOf<Map<string, number>>();
  });
  it('preserves nested generic types', () => {
    expectTypeOf(deepClone({ items: [{ id: 'x' }] })).toEqualTypeOf<{ items: { id: string }[] }>();
  });
});
