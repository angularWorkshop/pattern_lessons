import {
  InMemoryRawStorage,
  type RawStorage,
} from './raw-storage.js';

export interface StorageOptions {
  raw?: RawStorage;
  schemaVersion?: number;
}

interface Wrapped {
  v: number;
  d: unknown;
}

export class Storage {
  private raw: RawStorage;
  private fallback: InMemoryRawStorage | null = null;
  private readonly schemaVersion: number;
  public usingFallback = false;

  public constructor(options: StorageOptions = {}) {
    this.raw = options.raw ?? new InMemoryRawStorage();
    this.schemaVersion = options.schemaVersion ?? 1;
  }

  public set<T>(key: string, value: T): void {
    const wrapped: Wrapped = { v: this.schemaVersion, d: value };
    const serialized = JSON.stringify(wrapped);
    try {
      this.raw.setItem(key, serialized);
    } catch {
      this.activateFallback();
      this.raw.setItem(key, serialized);
    }
  }

  public get<T>(key: string): T | undefined {
    const raw = this.raw.getItem(key);
    if (raw === null) return undefined;
    let parsed: Wrapped;
    try {
      parsed = JSON.parse(raw) as Wrapped;
    } catch {
      return undefined;
    }
    if (parsed.v !== this.schemaVersion) {
      return undefined;
    }
    return parsed.d as T;
  }

  public remove(key: string): void {
    try {
      this.raw.removeItem(key);
    } catch {
      this.activateFallback();
      this.raw.removeItem(key);
    }
  }

  private activateFallback(): void {
    if (this.fallback) {
      this.raw = this.fallback;
      return;
    }
    this.fallback = new InMemoryRawStorage();
    this.raw = this.fallback;
    this.usingFallback = true;
  }
}
