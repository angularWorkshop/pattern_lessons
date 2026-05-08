export type ComparisonOp = '=' | '!=' | '>' | '<' | '>=' | '<=' | 'LIKE';
export type OrderDirection = 'ASC' | 'DESC';

export interface SqlOutput {
  sql: string;
  params: readonly unknown[];
}

interface WhereClause {
  column: string;
  op: ComparisonOp;
  value: unknown;
}

interface OrderClause {
  column: string;
  direction: OrderDirection;
}

export class QueryBuilder {
  protected columns: string[] = [];
  protected table: string | null = null;
  protected wheres: WhereClause[] = [];
  protected orders: OrderClause[] = [];
  protected limitCount: number | null = null;

  public select(...columns: string[]): this {
    this.columns = columns;
    return this;
  }

  public from(table: string): this {
    this.table = table;
    return this;
  }

  public where(column: string, op: ComparisonOp, value: unknown): this {
    this.wheres.push({ column, op, value });
    return this;
  }

  public orderBy(column: string, direction: OrderDirection = 'ASC'): this {
    this.orders.push({ column, direction });
    return this;
  }

  public limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  public toSQL(): SqlOutput {
    if (!this.table) {
      throw new Error('QueryBuilder: from() must be called before toSQL()');
    }

    const params: unknown[] = [];
    const columnList = this.columns.length === 0 ? '*' : this.columns.join(', ');
    const parts: string[] = [`SELECT ${columnList} FROM ${this.table}`];

    if (this.wheres.length > 0) {
      const whereParts = this.wheres.map((w) => {
        params.push(w.value);
        return `${w.column} ${w.op} $${params.length}`;
      });
      parts.push(`WHERE ${whereParts.join(' AND ')}`);
    }

    if (this.orders.length > 0) {
      const orderParts = this.orders.map((o) => `${o.column} ${o.direction}`);
      parts.push(`ORDER BY ${orderParts.join(', ')}`);
    }

    if (this.limitCount !== null) {
      params.push(this.limitCount);
      parts.push(`LIMIT $${params.length}`);
    }

    return { sql: parts.join(' '), params };
  }
}
