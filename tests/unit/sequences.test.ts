import { fibonacci, naturals, take, map } from '../../src/sequences.js';

describe('fibonacci — infinite sequence', () => {
  it('returns first 10 Fibonacci numbers', () => {
    expect(take(fibonacci(), 10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  it('iteration restarts fresh on a new fibonacci() call', () => {
    expect(take(fibonacci(), 3)).toEqual([0, 1, 1]);
    expect(take(fibonacci(), 3)).toEqual([0, 1, 1]);
  });
});

describe('naturals — infinite sequence', () => {
  it('starts from 0', () => {
    expect(take(naturals(), 5)).toEqual([0, 1, 2, 3, 4]);
  });
});

describe('take — bounded prefix from an unbounded source', () => {
  it('does not exhaust the source', () => {
    const gen = fibonacci();
    const first = take(gen, 3);
    expect(first).toEqual([0, 1, 1]);
    // Та же ссылка — продолжает с того места, где остановилась
    const next = take(gen, 3);
    expect(next).toEqual([2, 3, 5]);
  });

  it('take(0) returns an empty array', () => {
    expect(take(fibonacci(), 0)).toEqual([]);
  });

  it('take(n) on a finite source returns what is available', () => {
    expect(take([1, 2, 3], 10)).toEqual([1, 2, 3]);
  });
});

describe('map — lazy transformation', () => {
  it('maps an infinite sequence (must stay lazy)', () => {
    const squared = map(naturals(), (n) => n * n);
    expect(take(squared, 5)).toEqual([0, 1, 4, 9, 16]);
  });

  it('mapping a finite source returns the same shape', () => {
    const upper = map(['a', 'b', 'c'], (s) => s.toUpperCase());
    expect([...upper]).toEqual(['A', 'B', 'C']);
  });

  it('chained map composes correctly', () => {
    const result = map(map(naturals(), (n) => n + 1), (n) => n * 2);
    expect(take(result, 4)).toEqual([2, 4, 6, 8]);
  });
});

describe('map — laziness check', () => {
  it('does not call fn for values that are never consumed', () => {
    let calls = 0;
    const tracked = map(naturals(), (n) => {
      calls++;
      return n;
    });
    take(tracked, 3);
    expect(calls).toBe(3);
  });
});
