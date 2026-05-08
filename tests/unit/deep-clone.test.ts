import { deepClone } from '../../src/deep-clone.js';

describe('deepClone — primitives and null', () => {
  it('passes primitives through unchanged', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('x')).toBe('x');
    expect(deepClone(true)).toBe(true);
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });
});

describe('deepClone — arrays', () => {
  it('clones a flat array', () => {
    const src = [1, 2, 3];
    const out = deepClone(src);
    expect(out).toEqual(src);
    expect(out).not.toBe(src);
  });
  it('clones nested arrays without sharing references', () => {
    const src = [[1, 2], [3, 4]];
    const out = deepClone(src);
    expect(out).toEqual(src);
    expect(out[0]).not.toBe(src[0]);
  });
});

describe('deepClone — plain objects', () => {
  it('clones a flat object', () => {
    const src = { a: 1, b: 'x' };
    const out = deepClone(src);
    expect(out).toEqual(src);
    expect(out).not.toBe(src);
  });
  it('clones nested objects without sharing references', () => {
    const src = { a: { b: { c: 42 } } };
    const out = deepClone(src);
    expect(out).toEqual(src);
    expect(out.a).not.toBe(src.a);
    expect(out.a.b).not.toBe(src.a.b);
  });
});

describe('deepClone — Date / Map / Set', () => {
  it('clones a Date', () => {
    const src = new Date('2026-01-01T00:00:00.000Z');
    const out = deepClone(src);
    expect(out.getTime()).toBe(src.getTime());
    expect(out).not.toBe(src);
  });
  it('clones a Map', () => {
    const src = new Map<string, { v: number }>([['a', { v: 1 }]]);
    const out = deepClone(src);
    expect(out.get('a')).toEqual({ v: 1 });
    expect(out.get('a')).not.toBe(src.get('a'));
  });
  it('clones a Set', () => {
    const inner = { v: 1 };
    const src = new Set<{ v: number }>([inner]);
    const out = deepClone(src);
    expect(out.size).toBe(1);
    const cloned = [...out][0];
    expect(cloned).toEqual(inner);
    expect(cloned).not.toBe(inner);
  });
});

describe('deepClone — circular references', () => {
  it('handles a self-referencing object without infinite loop', () => {
    const src: { name: string; self?: unknown } = { name: 'root' };
    src.self = src;
    const out = deepClone(src);
    expect(out.name).toBe('root');
    expect(out.self).toBe(out);
    expect(out.self).not.toBe(src);
  });

  it('preserves shared references inside the same input', () => {
    const shared = { count: 1 };
    const src = { a: shared, b: shared };
    const out = deepClone(src);
    expect(out.a).toEqual({ count: 1 });
    expect(out.a).toBe(out.b);
    expect(out.a).not.toBe(shared);
  });
});

describe('deepClone — independence after clone', () => {
  it('mutating the clone does not change the source', () => {
    const src = { items: [{ x: 1 }] };
    const out = deepClone(src);
    out.items[0]!.x = 99;
    expect(src.items[0]!.x).toBe(1);
  });
});
