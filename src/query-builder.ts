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

  // TODO: каждый метод сохраняет состояние и возвращает this (fluent API).
  // toSQL собирает строку с параметрами вида $1, $2 ... и возвращает их в массиве.

  public select(..._columns: string[]): this {
    throw new Error('QueryBuilder.select is not implemented yet');
  }

  public from(_table: string): this {
    throw new Error('QueryBuilder.from is not implemented yet');
  }

  public where(_column: string, _op: ComparisonOp, _value: unknown): this {
    throw new Error('QueryBuilder.where is not implemented yet');
  }

  public orderBy(_column: string, _direction: OrderDirection = 'ASC'): this {
    throw new Error('QueryBuilder.orderBy is not implemented yet');
  }

  public limit(_count: number): this {
    throw new Error('QueryBuilder.limit is not implemented yet');
  }

  public toSQL(): SqlOutput {
    throw new Error('QueryBuilder.toSQL is not implemented yet');
  }
}
