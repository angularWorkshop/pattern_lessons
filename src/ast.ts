export type Expr =
  | { kind: 'num'; value: number }
  | { kind: 'var'; name: string }
  | { kind: 'binop'; op: '+' | '-' | '*' | '/'; left: Expr; right: Expr };

export type Env = Readonly<Record<string, number>>;

export function evaluate(node: Expr, env: Env): number {
  switch (node.kind) {
    case 'num':
      return node.value;
    case 'var': {
      const value = env[node.name];
      if (value === undefined) {
        throw new Error(`Unknown variable: ${node.name}`);
      }
      return value;
    }
    case 'binop': {
      const left = evaluate(node.left, env);
      const right = evaluate(node.right, env);
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
}

export function prettyPrint(node: Expr): string {
  switch (node.kind) {
    case 'num':
      return String(node.value);
    case 'var':
      return node.name;
    case 'binop':
      return `(${prettyPrint(node.left)} ${node.op} ${prettyPrint(node.right)})`;
  }
}

export function collectVars(node: Expr): readonly string[] {
  const out = new Set<string>();
  const walk = (n: Expr): void => {
    switch (n.kind) {
      case 'num':
        return;
      case 'var':
        out.add(n.name);
        return;
      case 'binop':
        walk(n.left);
        walk(n.right);
        return;
    }
  };
  walk(node);
  return [...out];
}
