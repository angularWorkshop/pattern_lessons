// Классический Visitor через двойную диспетчеризацию.
// Каждый узел реализует accept(visitor); visitor имеет метод на каждый тип узла.

export interface Visitor<R> {
  visitNum(node: NumNode): R;
  visitVar(node: VarNode): R;
  visitBinOp(node: BinOpNode): R;
}

export interface Node {
  accept<R>(visitor: Visitor<R>): R;
}

// TODO: реализовать accept() в трёх классах:
// каждый вызывает соответствующий метод visitor.visit*(this).

export class NumNode implements Node {
  public constructor(public readonly value: number) {}
  public accept<R>(_visitor: Visitor<R>): R {
    throw new Error('NumNode.accept is not implemented yet');
  }
}

export class VarNode implements Node {
  public constructor(public readonly name: string) {}
  public accept<R>(_visitor: Visitor<R>): R {
    throw new Error('VarNode.accept is not implemented yet');
  }
}

export class BinOpNode implements Node {
  public constructor(
    public readonly op: '+' | '-' | '*' | '/',
    public readonly left: Node,
    public readonly right: Node,
  ) {}
  public accept<R>(_visitor: Visitor<R>): R {
    throw new Error('BinOpNode.accept is not implemented yet');
  }
}

// TODO: реализовать Evaluator и Printer.

export type Env = Readonly<Record<string, number>>;

export class Evaluator implements Visitor<number> {
  public constructor(private readonly env: Env) {}

  public visitNum(_node: NumNode): number {
    throw new Error('Evaluator.visitNum is not implemented yet');
  }
  public visitVar(_node: VarNode): number {
    throw new Error('Evaluator.visitVar is not implemented yet');
  }
  public visitBinOp(_node: BinOpNode): number {
    throw new Error('Evaluator.visitBinOp is not implemented yet');
  }
}

export class Printer implements Visitor<string> {
  public visitNum(_node: NumNode): string {
    throw new Error('Printer.visitNum is not implemented yet');
  }
  public visitVar(_node: VarNode): string {
    throw new Error('Printer.visitVar is not implemented yet');
  }
  public visitBinOp(_node: BinOpNode): string {
    throw new Error('Printer.visitBinOp is not implemented yet');
  }
}
