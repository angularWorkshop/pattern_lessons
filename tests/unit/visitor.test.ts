import {
  NumNode,
  VarNode,
  BinOpNode,
  Evaluator,
  Printer,
} from '../../src/visitor.js';

describe('Classical Visitor — Evaluator', () => {
  it('evaluates a number', () => {
    const ev = new Evaluator({});
    expect(new NumNode(7).accept(ev)).toBe(7);
  });

  it('evaluates a variable', () => {
    const ev = new Evaluator({ x: 42 });
    expect(new VarNode('x').accept(ev)).toBe(42);
  });

  it('unknown variable throws', () => {
    const ev = new Evaluator({});
    expect(() => new VarNode('missing').accept(ev)).toThrow();
  });

  it('evaluates a nested expression', () => {
    const ev = new Evaluator({ x: 4 });
    // (2 + x) * 3 = 18
    const expr = new BinOpNode('*', new BinOpNode('+', new NumNode(2), new VarNode('x')), new NumNode(3));
    expect(expr.accept(ev)).toBe(18);
  });
});

describe('Classical Visitor — Printer', () => {
  it('prints a number', () => {
    expect(new NumNode(5).accept(new Printer())).toBe('5');
  });
  it('prints a variable', () => {
    expect(new VarNode('foo').accept(new Printer())).toBe('foo');
  });
  it('prints a nested expression with parentheses', () => {
    const expr = new BinOpNode('*', new BinOpNode('+', new NumNode(2), new VarNode('x')), new NumNode(3));
    expect(expr.accept(new Printer())).toBe('((2 + x) * 3)');
  });
});

describe('Adding a new visitor does not touch nodes', () => {
  it('can introduce a third visitor (depth) without editing NumNode/VarNode/BinOpNode', () => {
    // Define a depth visitor inline — purpose is to confirm the API supports it.
    class Depth {
      public visitNum(): number { return 1; }
      public visitVar(): number { return 1; }
      public visitBinOp(node: BinOpNode): number {
        return 1 + Math.max(
          node.left.accept(this as unknown as import('../../src/visitor.js').Visitor<number>),
          node.right.accept(this as unknown as import('../../src/visitor.js').Visitor<number>),
        );
      }
    }
    const v = new Depth() as unknown as import('../../src/visitor.js').Visitor<number>;
    const expr = new BinOpNode('+', new NumNode(1), new BinOpNode('+', new NumNode(2), new NumNode(3)));
    expect(expr.accept(v)).toBe(3);
  });
});
