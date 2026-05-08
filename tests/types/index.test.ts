import { expectTypeOf } from 'vitest';
import { createLazy } from '../../src/lazy-proxy.js';

describe('createLazy type contract', () => {
  it('returns the same type the factory returns', () => {
    const lazy = createLazy(() => ({ id: 'x', value: 42 }));
    expectTypeOf(lazy).toEqualTypeOf<{ id: string; value: number }>();
  });
});
