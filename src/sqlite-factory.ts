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
    this._open = true;
  }
  public close(): void {
    this._open = false;
  }
  public isOpen(): boolean {
    return this._open;
  }
}

export class SqliteQueryRunner implements QueryRunner {
  public readonly engine: DbEngine = 'sqlite';

  public run(connection: Connection, sql: string): readonly Record<string, unknown>[] {
    if (connection.engine !== this.engine) {
      throw new Error(
        `SqliteQueryRunner cannot run on engine ${connection.engine} connection`,
      );
    }
    return [{ engine: 'sqlite', sql }];
  }
}

export class SqliteTransaction implements Transaction {
  public readonly engine: DbEngine = 'sqlite';
  private _active = false;

  public begin(connection: Connection): void {
    if (connection.engine !== this.engine) {
      throw new Error(
        `SqliteTransaction cannot begin on engine ${connection.engine} connection`,
      );
    }
    this._active = true;
  }
  public commit(): void {
    this._active = false;
  }
  public rollback(): void {
    this._active = false;
  }
  public isActive(): boolean {
    return this._active;
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
