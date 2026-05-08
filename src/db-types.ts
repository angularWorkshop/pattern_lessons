export type DbEngine = 'postgres' | 'sqlite';

export interface Connection {
  readonly engine: DbEngine;
  open(): void;
  close(): void;
  isOpen(): boolean;
}

export interface QueryRunner {
  readonly engine: DbEngine;
  run(connection: Connection, sql: string): readonly Record<string, unknown>[];
}

export interface Transaction {
  readonly engine: DbEngine;
  begin(connection: Connection): void;
  commit(): void;
  rollback(): void;
  isActive(): boolean;
}

export interface DbFactory {
  readonly engine: DbEngine;
  createConnection(): Connection;
  createQueryRunner(): QueryRunner;
  createTransaction(): Transaction;
}
