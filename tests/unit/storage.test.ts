import { Storage } from '../../src/storage.js';
import { InMemoryRawStorage, FailingRawStorage } from '../../src/raw-storage.js';

describe('Storage facade — basic API', () => {
  it('writes and reads back a string', () => {
    const s = new Storage({ raw: new InMemoryRawStorage() });
    s.set('name', 'Alice');
    expect(s.get<string>('name')).toBe('Alice');
  });

  it('writes and reads back an object', () => {
    const s = new Storage({ raw: new InMemoryRawStorage() });
    s.set('user', { id: 1, name: 'A' });
    expect(s.get<{ id: number; name: string }>('user')).toEqual({ id: 1, name: 'A' });
  });

  it('returns undefined for missing keys', () => {
    expect(new Storage().get('nope')).toBeUndefined();
  });

  it('removes a key', () => {
    const s = new Storage();
    s.set('k', 1);
    s.remove('k');
    expect(s.get('k')).toBeUndefined();
  });
});

describe('Storage facade — schema version', () => {
  it('returns undefined when reading data with an older schema version', () => {
    const raw = new InMemoryRawStorage();
    const s1 = new Storage({ raw, schemaVersion: 1 });
    s1.set('user', { id: 1 });
    const s2 = new Storage({ raw, schemaVersion: 2 });
    expect(s2.get('user')).toBeUndefined();
  });

  it('keeps reading data when schema version matches', () => {
    const raw = new InMemoryRawStorage();
    const a = new Storage({ raw, schemaVersion: 5 });
    a.set('cfg', { theme: 'dark' });
    const b = new Storage({ raw, schemaVersion: 5 });
    expect(b.get('cfg')).toEqual({ theme: 'dark' });
  });
});

describe('Storage facade — fallback to in-memory when raw fails', () => {
  it('switches to fallback when set throws', () => {
    const s = new Storage({ raw: new FailingRawStorage() });
    s.set('k', 'v');
    expect(s.usingFallback).toBe(true);
    expect(s.get<string>('k')).toBe('v');
  });

  it('subsequent operations stay on the fallback', () => {
    const s = new Storage({ raw: new FailingRawStorage() });
    s.set('a', 1);
    s.set('b', 2);
    expect(s.get<number>('a')).toBe(1);
    expect(s.get<number>('b')).toBe(2);
  });
});
