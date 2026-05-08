import { QueryBuilder } from '../../src/query-builder.js';

describe('QueryBuilder — fluent API basics', () => {
  it('every chained method returns the builder so calls can be combined', () => {
    const builder = new QueryBuilder();
    expect(builder.select('id')).toBe(builder);
    expect(builder.from('users')).toBe(builder);
    expect(builder.where('age', '>', 18)).toBe(builder);
    expect(builder.orderBy('id')).toBe(builder);
    expect(builder.limit(10)).toBe(builder);
  });
});

describe('QueryBuilder.toSQL — assembles SQL with positional params', () => {
  it('renders a basic select with a from', () => {
    const out = new QueryBuilder().select('id', 'name').from('users').toSQL();
    expect(out.sql).toBe('SELECT id, name FROM users');
    expect(out.params).toEqual([]);
  });

  it('uses * when no columns are listed', () => {
    const out = new QueryBuilder().select().from('posts').toSQL();
    expect(out.sql).toBe('SELECT * FROM posts');
  });

  it('renders a single where clause with $1 placeholder', () => {
    const out = new QueryBuilder().select('id').from('users').where('age', '>', 18).toSQL();
    expect(out.sql).toBe('SELECT id FROM users WHERE age > $1');
    expect(out.params).toEqual([18]);
  });

  it('joins multiple where clauses with AND and increments placeholders', () => {
    const out = new QueryBuilder()
      .select('id')
      .from('users')
      .where('age', '>', 18)
      .where('city', '=', 'Moscow')
      .toSQL();
    expect(out.sql).toBe('SELECT id FROM users WHERE age > $1 AND city = $2');
    expect(out.params).toEqual([18, 'Moscow']);
  });

  it('renders order by with direction default ASC', () => {
    const out = new QueryBuilder().select('id').from('users').orderBy('name').toSQL();
    expect(out.sql).toBe('SELECT id FROM users ORDER BY name ASC');
  });

  it('respects an explicit DESC direction', () => {
    const out = new QueryBuilder().select('id').from('users').orderBy('name', 'DESC').toSQL();
    expect(out.sql).toBe('SELECT id FROM users ORDER BY name DESC');
  });

  it('combines all clauses in canonical order', () => {
    const out = new QueryBuilder()
      .select('id', 'name')
      .from('users')
      .where('age', '>', 18)
      .orderBy('name', 'ASC')
      .limit(10)
      .toSQL();
    expect(out.sql).toBe(
      'SELECT id, name FROM users WHERE age > $1 ORDER BY name ASC LIMIT $2',
    );
    expect(out.params).toEqual([18, 10]);
  });

  it('throws when from() was not called', () => {
    expect(() => new QueryBuilder().select('id').toSQL()).toThrow(/from/i);
  });
});
