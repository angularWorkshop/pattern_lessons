export class Cache<V> {
  private static instance: Cache<unknown> | null = null;
  private readonly store = new Map<string, V>();

  private constructor() {}

  public static getInstance<V>(): Cache<V> {
    if (!Cache.instance) {
      Cache.instance = new Cache<unknown>();
    }
    return Cache.instance as Cache<V>;
  }

  public static reset(): void {
    Cache.instance = null;
  }

  public static createIsolated<V>(): Cache<V> {
    return new Cache<V>();
  }

  public get(key: string): V | undefined {
    return this.store.get(key);
  }

  public set(key: string, value: V): void {
    this.store.set(key, value);
  }

  public delete(key: string): boolean {
    return this.store.delete(key);
  }

  public clear(): void {
    this.store.clear();
  }

  public size(): number {
    return this.store.size;
  }
}
