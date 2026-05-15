export interface Visitor<R> {
  visitNum(node: NumNode): R;
  visitVar(node: VarNode): R;
  visitBinOp(node: BinOpNode): R;
}

export interface Node {
  accept<R>(visitor: Visitor<R>): R;
}

export class NumNode implements Node {
  public constructor(public readonly value: number) {}
  public accept<R>(visitor: Visitor<R>): R {
    return visitor.visitNum(this);
  }
}

export class VarNode implements Node {
  public constructor(public readonly name: string) {}
  public accept<R>(visitor: Visitor<R>): R {
    return visitor.visitVar(this);
  }
}

export class BinOpNode implements Node {
  public constructor(
    public readonly op: '+' | '-' | '*' | '/',
    public readonly left: Node,
    public readonly right: Node,
  ) {}
  public accept<R>(visitor: Visitor<R>): R {
    return visitor.visitBinOp(this);
  }
}

export type Env = Readonly<Record<string, number>>;

export class Evaluator implements Visitor<number> {
  public constructor(private readonly env: Env) {}

  public visitNum(node: NumNode): number {
    return node.value;
  }
  public visitVar(node: VarNode): number {
    const value = this.env[node.name];
    if (value === undefined) {
      throw new Error(`Unknown variable: ${node.name}`);
    }
    return value;
  }
  public visitBinOp(node: BinOpNode): number {
    const left = node.left.accept(this);
    const right = node.right.accept(this);
    switch (node.op) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        if (right === 0) throw new Error('Division by zero');
        return left / right;
    }
  }
}

export class Printer implements Visitor<string> {
  public visitNum(node: NumNode): string {
    return String(node.value);
  }
  public visitVar(node: VarNode): string {
    return node.name;
  }
  public visitBinOp(node: BinOpNode): string {
    return `(${node.left.accept(this)} ${node.op} ${node.right.accept(this)})`;
  }
}
