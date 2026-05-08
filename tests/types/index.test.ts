import { expectTypeOf } from 'vitest';
import { Storage } from '../../src/storage.js';

describe('Storage type contracts', () => {
  it('get is generic — returns T | undefined', () => {
    const s = new Storage();
    expectTypeOf(s.get<{ id: number }>('x')).toEqualTypeOf<{ id: number } | undefined>();
  });
  it('set takes string key and any T', () => {
    const s = new Storage();
    expectTypeOf(s.set<string>).parameters.toEqualTypeOf<[string, string]>();
  });
});
