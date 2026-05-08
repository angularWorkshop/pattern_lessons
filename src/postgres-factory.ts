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

  // TODO: реализовать open / close / isOpen
  public open(): void {
    throw new Error('PostgresConnection.open is not implemented yet');
  }
  public close(): void {
    throw new Error('PostgresConnection.close is not implemented yet');
  }
  public isOpen(): boolean {
    return this._open;
  }
}

export class PostgresQueryRunner implements QueryRunner {
  public readonly engine: DbEngine = 'postgres';

  // TODO: run должен принимать только PostgresConnection. Если в run прилетел
  // foreign engine — кидать ошибку с упоминанием engine.
  public run(_connection: Connection, _sql: string): readonly Record<string, unknown>[] {
    throw new Error('PostgresQueryRunner.run is not implemented yet');
  }
}

export class PostgresTransaction implements Transaction {
  public readonly engine: DbEngine = 'postgres';

  // TODO: begin/commit/rollback. begin принимает только postgres-connection.
  public begin(_connection: Connection): void {
    throw new Error('PostgresTransaction.begin is not implemented yet');
  }
  public commit(): void {
    throw new Error('PostgresTransaction.commit is not implemented yet');
  }
  public rollback(): void {
    throw new Error('PostgresTransaction.rollback is not implemented yet');
  }
  public isActive(): boolean {
    return false;
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
