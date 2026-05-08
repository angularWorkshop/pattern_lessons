import { reactive, effect } from '../../src/reactive.js';

describe('reactive — basic property mirroring', () => {
  it('reads and writes pass through to the target', () => {
    const state = reactive({ count: 0, name: 'a' });
    expect(state.count).toBe(0);
    state.count = 5;
    expect(state.count).toBe(5);
    state.name = 'b';
    expect(state.name).toBe('b');
  });
});

describe('effect — tracks dependencies and reruns on change', () => {
  it('runs once on registration', () => {
    const state = reactive({ count: 0 });
    let runs = 0;
    effect(() => {
      runs++;
      void state.count;
    });
    expect(runs).toBe(1);
  });

  it('reruns when a tracked field changes', () => {
    const state = reactive({ count: 0 });
    let observed = 0;
    effect(() => {
      observed = state.count;
    });
    state.count = 10;
    expect(observed).toBe(10);
    state.count = 20;
    expect(observed).toBe(20);
  });

  it('does not rerun for unrelated fields', () => {
    const state = reactive({ count: 0, other: 'x' });
    let runs = 0;
    effect(() => {
      runs++;
      void state.count;
    });
    state.other = 'y';
    expect(runs).toBe(1);
  });

  it('multiple effects on the same field both rerun', () => {
    const state = reactive({ value: 1 });
    let a = 0;
    let b = 0;
    effect(() => {
      a = state.value;
    });
    effect(() => {
      b = state.value * 2;
    });
    state.value = 7;
    expect(a).toBe(7);
    expect(b).toBe(14);
  });

  it('one effect can depend on multiple fields', () => {
    const state = reactive({ x: 1, y: 2 });
    let sum = 0;
    effect(() => {
      sum = state.x + state.y;
    });
    state.x = 10;
    expect(sum).toBe(12);
    state.y = 20;
    expect(sum).toBe(30);
  });
});

describe('effect cleanup — removing subscription', () => {
  it('returned cleanup function detaches the effect', () => {
    const state = reactive({ count: 0 });
    let runs = 0;
    const stop = effect(() => {
      runs++;
      void state.count;
    });
    state.count = 1;
    expect(runs).toBe(2);
    stop();
    state.count = 2;
    expect(runs).toBe(2);
  });
});

describe('avoiding infinite loops', () => {
  it('writes inside an effect do not infinitely retrigger the same effect', () => {
    const state = reactive({ count: 0, doubled: 0 });
    let runs = 0;
    effect(() => {
      runs++;
      state.doubled = state.count * 2;
    });
    expect(runs).toBe(1);
    expect(state.doubled).toBe(0);
    state.count = 5;
    expect(state.doubled).toBe(10);
    expect(runs).toBeLessThan(10); // sanity bound — must not explode
  });
});
