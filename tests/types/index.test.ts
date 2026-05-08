import { expectTypeOf } from 'vitest';
import { reactive, effect } from '../../src/reactive.js';

describe('reactive type contracts', () => {
  it('reactive(obj) returns the same type', () => {
    const r = reactive({ count: 0 });
    expectTypeOf(r).toEqualTypeOf<{ count: number }>();
  });
  it('effect returns a cleanup function', () => {
    const cleanup = effect(() => {});
    expectTypeOf(cleanup).toEqualTypeOf<() => void>();
  });
});
