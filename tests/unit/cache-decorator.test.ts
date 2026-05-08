import { Calculator } from '../../src/calculator.js';

describe('@cache decorator on Calculator', () => {
  it('first call computes the result', () => {
    const c = new Calculator();
    expect(c.compute(2, 3)).toBe(5);
    expect(c.calls).toBe(1);
  });

  it('repeat call with same args is cached', () => {
    const c = new Calculator();
    c.compute(2, 3);
    c.compute(2, 3);
    c.compute(2, 3);
    expect(c.calls).toBe(1);
  });

  it('different args = different cache entries', () => {
    const c = new Calculator();
    c.compute(2, 3);
    c.compute(2, 4);
    expect(c.calls).toBe(2);
  });

  it('caches another method independently', () => {
    const c = new Calculator();
    c.compute(2, 3);
    c.greet('Max');
    c.greet('Max');
    expect(c.calls).toBe(2);
  });

  it('separate instances have separate caches', () => {
    const a = new Calculator();
    const b = new Calculator();
    a.compute(2, 3);
    b.compute(2, 3);
    expect(a.calls).toBe(1);
    expect(b.calls).toBe(1);
  });

  it('returns the cached value, not a stale or new computation', () => {
    const c = new Calculator();
    expect(c.compute(10, 20)).toBe(30);
    expect(c.compute(10, 20)).toBe(30);
    expect(c.greet('Lee')).toBe('Hello, Lee!');
    expect(c.greet('Lee')).toBe('Hello, Lee!');
  });
});
