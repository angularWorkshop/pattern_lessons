// Минимальный интерфейс localStorage. У реального API есть getItem/setItem/removeItem
// и кидание QuotaExceededError. Тут проксируем, чтобы тесты могли подсунуть
// разные реализации (рабочий, упавший, in-memory).
export interface RawStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

// Дефолтная реализация — обычный Map. На практике сюда подсовывался бы
// настоящий localStorage браузера.
export class InMemoryRawStorage implements RawStorage {
  private readonly map = new Map<string, string>();
  public getItem(key: string): string | null {
    return this.map.has(key) ? (this.map.get(key) as string) : null;
  }
  public setItem(key: string, value: string): void {
    this.map.set(key, value);
  }
  public removeItem(key: string): void {
    this.map.delete(key);
  }
}

// «Сломанный» localStorage — кидает на любой setItem. Эмулирует Safari private mode.
export class FailingRawStorage implements RawStorage {
  public getItem(_key: string): string | null {
    return null;
  }
  public setItem(_key: string, _value: string): void {
    throw new Error('QuotaExceededError');
  }
  public removeItem(_key: string): void {
    throw new Error('QuotaExceededError');
  }
}
