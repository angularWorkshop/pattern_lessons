import type { Env, Expr } from './expr.js';

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
          if (right === 0) {
            throw new Error('Division by zero');
          }
          return left / right;
        default: {
          const _exhaustiveOp: never = node.op;
          throw new Error(`Unknown op: ${String(_exhaustiveOp)}`);
        }
      }
    }
    default: {
      const _exhaustive: never = node;
      throw new Error(`Unknown node kind: ${String(_exhaustive)}`);
    }
  }
}
