import { expectTypeOf } from 'vitest';
import { createSignal, type Getter, type Setter } from '../../src/signals.js';

describe('Signal type contracts', () => {
  it('createSignal returns [getter, setter] preserving T', () => {
    const [count, setCount] = createSignal(0);
    expectTypeOf(count).toEqualTypeOf<Getter<number>>();
    expectTypeOf(setCount).toEqualTypeOf<Setter<number>>();
    expectTypeOf(count()).toEqualTypeOf<number>();
  });

  it('works with complex types', () => {
    const [user] = createSignal({ id: 'x', name: 'A' });
    expectTypeOf(user()).toEqualTypeOf<{ id: string; name: string }>();
  });
});
