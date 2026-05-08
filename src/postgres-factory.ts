import type {
  Connection,
  DbEngine,
  DbFactory,
  QueryRunner,
  Transaction,
} from './db-types.js';

export class PostgresConnection implements Connection {
  public readonly engine: DbEngine = 'postgres';
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

export class PostgresQueryRunner implements QueryRunner {
  public readonly engine: DbEngine = 'postgres';

  public run(connection: Connection, sql: string): readonly Record<string, unknown>[] {
    if (connection.engine !== this.engine) {
      throw new Error(
        `PostgresQueryRunner cannot run on engine ${connection.engine} connection`,
      );
    }
    return [{ engine: 'postgres', sql }];
  }
}

export class PostgresTransaction implements Transaction {
  public readonly engine: DbEngine = 'postgres';
  private _active = false;

  public begin(connection: Connection): void {
    if (connection.engine !== this.engine) {
      throw new Error(
        `PostgresTransaction cannot begin on engine ${connection.engine} connection`,
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

export class PostgresFactory implements DbFactory {
  public readonly engine: DbEngine = 'postgres';

  public createConnection(): Connection {
    return new PostgresConnection();
  }
  public createQueryRunner(): QueryRunner {
    return new PostgresQueryRunner();
  }
  public createTransaction(): Transaction {
    return new PostgresTransaction();
  }
}
