import type {
  Connection,
  DbEngine,
  DbFactory,
  QueryRunner,
  Transaction,
} from './db-types.js';

export class SqliteConnection implements Connection {
  public readonly engine: DbEngine = 'sqlite';
  private _open = false;

  public open(): void {
    throw new Error('SqliteConnection.open is not implemented yet');
  }
  public close(): void {
    throw new Error('SqliteConnection.close is not implemented yet');
  }
  public isOpen(): boolean {
    return this._open;
  }
}

export class SqliteQueryRunner implements QueryRunner {
  public readonly engine: DbEngine = 'sqlite';

  public run(_connection: Connection, _sql: string): readonly Record<string, unknown>[] {
    throw new Error('SqliteQueryRunner.run is not implemented yet');
  }
}

export class SqliteTransaction implements Transaction {
  public readonly engine: DbEngine = 'sqlite';

  public begin(_connection: Connection): void {
    throw new Error('SqliteTransaction.begin is not implemented yet');
  }
  public commit(): void {
    throw new Error('SqliteTransaction.commit is not implemented yet');
  }
  public rollback(): void {
    throw new Error('SqliteTransaction.rollback is not implemented yet');
  }
  public isActive(): boolean {
    return false;
  }
}

export class SqliteFactory implements DbFactory {
  public readonly engine: DbEngine = 'sqlite';

  public createConnection(): Connection {
    return new SqliteConnection();
  }
  public createQueryRunner(): QueryRunner {
    return new SqliteQueryRunner();
  }
  public createTransaction(): Transaction {
    return new SqliteTransaction();
  }
}
