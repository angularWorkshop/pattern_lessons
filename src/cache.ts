// Cache — singleton с поддержкой test-isolation.
// Главный фокус упражнения: тесты, которые не текут друг в друга.
//
// TODO: реализовать singleton с приватным конструктором + getInstance().
// Плюс несколько методов изоляции для тестов:
// - reset() — обнуляет глобальный instance (для beforeEach)
// - createIsolated() — фабричный метод, возвращает НЕ singleton-инстанс
//   для использования в DI и в продвинутых тестах
export class Cache<V> {
  private static instance: Cache<unknown> | null = null;
  private readonly store = new Map<string, V>();

  private constructor() {}

  public static getInstance<V>(): Cache<V> {
    throw new Error('Cache.getInstance is not implemented yet');
  }

  public static reset(): void {
    throw new Error('Cache.reset is not implemented yet');
  }

  // Фабрика для тестов / DI: создаёт НЕ singleton-экземпляр.
  // Полезно когда два места приложения должны иметь раздельные кэши.
  public static createIsolated<V>(): Cache<V> {
    throw new Error('Cache.createIsolated is not implemented yet');
  }

  public get(_key: string): V | undefined {
    throw new Error('Cache.get is not implemented yet');
  }

  public set(_key: string, _value: V): void {
    throw new Error('Cache.set is not implemented yet');
  }

  public delete(_key: string): boolean {
    throw new Error('Cache.delete is not implemented yet');
  }

  public clear(): void {
    throw new Error('Cache.clear is not implemented yet');
  }

  public size(): number {
    return this.store.size;
  }
}
