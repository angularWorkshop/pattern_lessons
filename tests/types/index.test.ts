import { expectTypeOf } from 'vitest';
import { PostgresFactory } from '../../src/postgres-factory.js';
import { SqliteFactory } from '../../src/sqlite-factory.js';
import type {
  Connection,
  DbEngine,
  DbFactory,
  QueryRunner,
  Transaction,
} from '../../src/db-types.js';

describe('Abstract Factory type contracts', () => {
  it('DbEngine union has both engines', () => {
    expectTypeOf<DbEngine>().toEqualTypeOf<'postgres' | 'sqlite'>();
  });
  it('DbFactory.createConnection returns a Connection', () => {
    expectTypeOf<DbFactory['createConnection']>().returns.toEqualTypeOf<Connection>();
  });
  it('DbFactory.createQueryRunner returns a QueryRunner', () => {
    expectTypeOf<DbFactory['createQueryRunner']>().returns.toEqualTypeOf<QueryRunner>();
  });
  it('DbFactory.createTransaction returns a Transaction', () => {
    expectTypeOf<DbFactory['createTransaction']>().returns.toEqualTypeOf<Transaction>();
  });
  it('PostgresFactory and SqliteFactory both implement DbFactory', () => {
    expectTypeOf<PostgresFactory>().toMatchTypeOf<DbFactory>();
    expectTypeOf<SqliteFactory>().toMatchTypeOf<DbFactory>();
  });
});
