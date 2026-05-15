import { expectTypeOf } from 'vitest';
import {
  NumNode,
  Evaluator,
  Printer,
  type Visitor,
} from '../../src/visitor.js';

describe('Classical Visitor type contracts', () => {
  it('accept is generic in the visitor result', () => {
    const num = new NumNode(1);
    expectTypeOf(num.accept(new Evaluator({}))).toEqualTypeOf<number>();
    expectTypeOf(num.accept(new Printer())).toEqualTypeOf<string>();
  });

  it('Visitor interface has visitNum / visitVar / visitBinOp', () => {
    expectTypeOf<Visitor<unknown>>().toHaveProperty('visitNum');
    expectTypeOf<Visitor<unknown>>().toHaveProperty('visitVar');
    expectTypeOf<Visitor<unknown>>().toHaveProperty('visitBinOp');
  });
});
