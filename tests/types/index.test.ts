import { expectTypeOf } from 'vitest';
import { Cache } from '../../src/cache.js';

describe('Cache type contracts', () => {
  it('getInstance is generic — returns Cache<V>', () => {
    const c = Cache.getInstance<{ id: string }>();
    expectTypeOf(c.get('x')).toEqualTypeOf<{ id: string } | undefined>();
  });
  it('createIsolated returns Cache<V>', () => {
    const c = Cache.createIsolated<number>();
    expectTypeOf(c.get('x')).toEqualTypeOf<number | undefined>();
  });
  it('set takes string key and V', () => {
    const c = Cache.createIsolated<string>();
    expectTypeOf(c.set).parameters.toEqualTypeOf<[string, string]>();
  });
});
