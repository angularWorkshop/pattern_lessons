import type { Expr } from './expr.js';

export function prettyPrint(node: Expr): string {
  switch (node.kind) {
    case 'num':
      return String(node.value);
    case 'var':
      return node.name;
    case 'binop':
      return `(${prettyPrint(node.left)} ${node.op} ${prettyPrint(node.right)})`;
    default: {
      const _exhaustive: never = node;
      throw new Error(`Unknown node kind: ${String(_exhaustive)}`);
    }
  }
}
