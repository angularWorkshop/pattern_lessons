import {
  InMemoryRawStorage,
  type RawStorage,
} from './raw-storage.js';

// Facade над raw-storage: добавляет JSON-сериализацию, версионирование схемы
// и fallback на in-memory, если основной storage сломан.
//
// Каждое значение хранится в обёртке: { v: <schemaVersion>, d: <data> }
// При getItem с другой версией — возвращаем undefined (миграция выходит за рамки).

export interface StorageOptions {
  raw?: RawStorage;
  schemaVersion?: number;
}

interface Wrapped {
  v: number;
  d: unknown;
}

// TODO: реализовать. Storage инкапсулирует RawStorage, JSON и version.
// На setItem ошибку RawStorage → перейти на in-memory fallback и записать туда.
// Это и есть «чёрный ящик» Facade'а: snaружи никто не должен знать про fallback.
export class Storage {
  private raw: RawStorage;
  private fallback: InMemoryRawStorage | null = null;
  private readonly schemaVersion: number;
  public usingFallback = false;

  public constructor(options: StorageOptions = {}) {
    this.raw = options.raw ?? new InMemoryRawStorage();
    this.schemaVersion = options.schemaVersion ?? 1;
  }

  public set<T>(_key: string, _value: T): void {
    throw new Error('Storage.set is not implemented yet');
  }

  public get<T>(_key: string): T | undefined {
    throw new Error('Storage.get is not implemented yet');
  }

  public remove(_key: string): void {
    throw new Error('Storage.remove is not implemented yet');
  }
}
