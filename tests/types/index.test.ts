import { expectTypeOf } from 'vitest';
import { fibonacci, naturals, take, map } from '../../src/sequences.js';

describe('sequence type contracts', () => {
  it('fibonacci returns Generator<number, void, unknown>', () => {
    expectTypeOf(fibonacci()).toEqualTypeOf<Generator<number, void, unknown>>();
  });
  it('naturals returns Generator<number, void, unknown>', () => {
    expectTypeOf(naturals()).toEqualTypeOf<Generator<number, void, unknown>>();
  });
  it('take returns an array of the source element type', () => {
    expectTypeOf(take(naturals(), 5)).toEqualTypeOf<number[]>();
    expectTypeOf(take(['a', 'b'], 2)).toEqualTypeOf<string[]>();
  });
  it('map carries the mapped type', () => {
    expectTypeOf(map(naturals(), (n) => String(n))).toEqualTypeOf<Iterable<string>>();
  });
});
