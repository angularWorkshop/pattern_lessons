import { Cache } from '../../src/cache.js';

describe('Cache singleton — basic API', () => {
  beforeEach(() => Cache.reset());

  it('starts empty', () => {
    expect(Cache.getInstance().size()).toBe(0);
  });

  it('saves and retrieves values', () => {
    const c = Cache.getInstance<string>();
    c.set('a', 'first');
    c.set('b', 'second');
    expect(c.get('a')).toBe('first');
    expect(c.get('b')).toBe('second');
  });

  it('returns undefined for missing keys', () => {
    expect(Cache.getInstance<number>().get('nope')).toBeUndefined();
  });

  it('overwrites existing values', () => {
    const c = Cache.getInstance<string>();
    c.set('k', '1');
    c.set('k', '2');
    expect(c.get('k')).toBe('2');
  });

  it('deletes a key and returns whether something was removed', () => {
    const c = Cache.getInstance<string>();
    c.set('k', 'v');
    expect(c.delete('k')).toBe(true);
    expect(c.delete('k')).toBe(false);
    expect(c.get('k')).toBeUndefined();
  });

  it('clear removes all entries', () => {
    const c = Cache.getInstance<number>();
    c.set('a', 1);
    c.set('b', 2);
    c.clear();
    expect(c.size()).toBe(0);
  });

  it('getInstance always returns the same object', () => {
    expect(Cache.getInstance()).toBe(Cache.getInstance());
  });
});

describe('Cache singleton — test isolation through reset()', () => {
  beforeEach(() => Cache.reset());

  it('test A — leaves a value behind', () => {
    Cache.getInstance<string>().set('shared', 'A');
    expect(Cache.getInstance<string>().get('shared')).toBe('A');
  });

  it('test B — does NOT see A\'s value', () => {
    expect(Cache.getInstance<string>().get('shared')).toBeUndefined();
  });

  it('test C — also sees a clean cache', () => {
    expect(Cache.getInstance<string>().size()).toBe(0);
  });
});

describe('Cache.createIsolated — DI-friendly fresh instance', () => {
  beforeEach(() => Cache.reset());

  it('creates an instance independent from the global singleton', () => {
    const isolated = Cache.createIsolated<string>();
    isolated.set('local', 'x');
    expect(Cache.getInstance<string>().get('local')).toBeUndefined();
  });

  it('two isolated caches are independent of each other', () => {
    const a = Cache.createIsolated<number>();
    const b = Cache.createIsolated<number>();
    a.set('k', 1);
    expect(b.get('k')).toBeUndefined();
  });
});
