import { pipeline } from '../../src/pipeline.js';

describe('pipeline — composes typed steps', () => {
  it('single step is just that function', () => {
    const upper = pipeline((s: string) => s.toUpperCase());
    expect(upper('hi')).toBe('HI');
  });

  it('two steps: string → number → boolean', () => {
    const fn = pipeline(
      (s: string) => s.length,
      (n: number) => n > 3,
    );
    expect(fn('hello')).toBe(true);
    expect(fn('hi')).toBe(false);
  });

  it('three steps', () => {
    const fn = pipeline(
      (s: string) => s.trim(),
      (s: string) => s.toUpperCase(),
      (s: string) => `[${s}]`,
    );
    expect(fn('  hello  ')).toBe('[HELLO]');
  });

  it('four steps', () => {
    const fn = pipeline(
      (n: number) => n + 1,
      (n: number) => n * 2,
      (n: number) => `${n}`,
      (s: string) => s.length,
    );
    expect(fn(4)).toBe(2);  // (4+1)*2 = "10" → length 2
  });

  it('throws are propagated', () => {
    const fn = pipeline(
      (n: number) => {
        if (n < 0) throw new Error('negative');
        return n;
      },
      (n: number) => n * 2,
    );
    expect(() => fn(-1)).toThrow('negative');
  });
});
