import {
  PostgresFactory,
  PostgresConnection,
  PostgresQueryRunner,
  PostgresTransaction,
} from '../../src/postgres-factory.js';
import {
  SqliteFactory,
  SqliteConnection,
  SqliteQueryRunner,
  SqliteTransaction,
} from '../../src/sqlite-factory.js';

describe('PostgresFactory — produces a postgres-only family', () => {
  it('factory.engine === "postgres"', () => {
    expect(new PostgresFactory().engine).toBe('postgres');
  });
  it('createConnection returns a PostgresConnection that opens', () => {
    const conn = new PostgresFactory().createConnection();
    expect(conn).toBeInstanceOf(PostgresConnection);
    conn.open();
    expect(conn.isOpen()).toBe(true);
    conn.close();
    expect(conn.isOpen()).toBe(false);
  });
  it('createQueryRunner runs SQL on a postgres connection', () => {
    const factory = new PostgresFactory();
    const conn = factory.createConnection();
    conn.open();
    const runner = factory.createQueryRunner();
    expect(runner).toBeInstanceOf(PostgresQueryRunner);
    expect(runner.run(conn, 'select 1')).toEqual([{ engine: 'postgres', sql: 'select 1' }]);
  });
  it('createTransaction begins, commits and tracks state', () => {
    const factory = new PostgresFactory();
    const conn = factory.createConnection();
    conn.open();
    const tx = factory.createTransaction();
    expect(tx).toBeInstanceOf(PostgresTransaction);
    tx.begin(conn);
    expect(tx.isActive()).toBe(true);
    tx.commit();
    expect(tx.isActive()).toBe(false);
  });
});

describe('SqliteFactory — produces a sqlite-only family', () => {
  it('factory.engine === "sqlite"', () => {
    expect(new SqliteFactory().engine).toBe('sqlite');
  });
  it('createConnection returns a SqliteConnection that opens', () => {
    const conn = new SqliteFactory().createConnection();
    expect(conn).toBeInstanceOf(SqliteConnection);
    conn.open();
    expect(conn.isOpen()).toBe(true);
  });
  it('createQueryRunner returns a SqliteQueryRunner', () => {
    expect(new SqliteFactory().createQueryRunner()).toBeInstanceOf(SqliteQueryRunner);
  });
  it('createTransaction returns a SqliteTransaction', () => {
    expect(new SqliteFactory().createTransaction()).toBeInstanceOf(SqliteTransaction);
  });
});

describe('Family compatibility — cross-engine usage must fail at runtime', () => {
  it('PostgresQueryRunner refuses to run on a SqliteConnection', () => {
    const pg = new PostgresFactory().createQueryRunner();
    const sqliteConn = new SqliteFactory().createConnection();
    sqliteConn.open();
    expect(() => pg.run(sqliteConn, 'select 1')).toThrow(/engine/);
  });
  it('SqliteTransaction refuses to begin on a PostgresConnection', () => {
    const sqliteTx = new SqliteFactory().createTransaction();
    const pgConn = new PostgresFactory().createConnection();
    pgConn.open();
    expect(() => sqliteTx.begin(pgConn)).toThrow(/engine/);
  });
});
