import { createSignal, effect } from '../../src/signals.js';

describe('createSignal — basic get/set', () => {
  it('returns getter and setter', () => {
    const [count, setCount] = createSignal(0);
    expect(count()).toBe(0);
    setCount(5);
    expect(count()).toBe(5);
  });
});

describe('effect — auto-subscribes to signals it reads', () => {
  it('runs once at registration', () => {
    const [count] = createSignal(0);
    let runs = 0;
    effect(() => {
      runs++;
      void count();
    });
    expect(runs).toBe(1);
  });

  it('reruns when a tracked signal changes', () => {
    const [count, setCount] = createSignal(0);
    let observed = 0;
    effect(() => {
      observed = count();
    });
    setCount(7);
    expect(observed).toBe(7);
    setCount(42);
    expect(observed).toBe(42);
  });

  it('does NOT rerun when an unrelated signal changes', () => {
    const [a, setA] = createSignal(1);
    const [, setB] = createSignal(100);
    let runs = 0;
    effect(() => {
      runs++;
      void a();
    });
    setB(200);
    expect(runs).toBe(1);
    setA(2);
    expect(runs).toBe(2);
  });
});

describe('effect — multiple signals + multiple effects', () => {
  it('one effect can depend on multiple signals', () => {
    const [a, setA] = createSignal(1);
    const [b, setB] = createSignal(2);
    let sum = 0;
    effect(() => {
      sum = a() + b();
    });
    setA(10);
    expect(sum).toBe(12);
    setB(20);
    expect(sum).toBe(30);
  });

  it('multiple effects can depend on the same signal', () => {
    const [count, setCount] = createSignal(0);
    let x = 0;
    let y = 0;
    effect(() => {
      x = count() * 2;
    });
    effect(() => {
      y = count() + 100;
    });
    setCount(5);
    expect(x).toBe(10);
    expect(y).toBe(105);
  });
});
