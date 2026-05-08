import { expectTypeOf } from 'vitest';
import { QueryBuilder, type ComparisonOp, type OrderDirection, type SqlOutput } from '../../src/query-builder.js';

describe('QueryBuilder type contracts', () => {
  it('ComparisonOp covers the expected operators', () => {
    expectTypeOf<ComparisonOp>().toEqualTypeOf<'=' | '!=' | '>' | '<' | '>=' | '<=' | 'LIKE'>();
  });
  it('OrderDirection is ASC or DESC', () => {
    expectTypeOf<OrderDirection>().toEqualTypeOf<'ASC' | 'DESC'>();
  });
  it('select returns the builder for chaining', () => {
    expectTypeOf(QueryBuilder.prototype.select).returns.toEqualTypeOf<QueryBuilder>();
  });
  it('toSQL returns a SqlOutput with sql and params', () => {
    expectTypeOf(QueryBuilder.prototype.toSQL).returns.toEqualTypeOf<SqlOutput>();
    expectTypeOf<SqlOutput['sql']>().toEqualTypeOf<string>();
    expectTypeOf<SqlOutput['params']>().toEqualTypeOf<readonly unknown[]>();
  });
});
