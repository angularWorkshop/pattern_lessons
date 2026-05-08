import { expectTypeOf } from 'vitest';
import { HistoryStack } from '../../src/history-stack.js';

describe('HistoryStack type contracts', () => {
  it('getState returns the parameterized type', () => {
    const h = new HistoryStack<{ id: number }>({ id: 1 });
    expectTypeOf(h.getState).returns.toEqualTypeOf<{ id: number }>();
  });
  it('push takes the same type, returns void', () => {
    const h = new HistoryStack<{ id: number }>({ id: 1 });
    expectTypeOf(h.push).parameters.toEqualTypeOf<[{ id: number }]>();
    expectTypeOf(h.push).returns.toEqualTypeOf<void>();
  });
  it('undo and redo return the parameterized type', () => {
    const h = new HistoryStack<string>('a');
    expectTypeOf(h.undo).returns.toEqualTypeOf<string>();
    expectTypeOf(h.redo).returns.toEqualTypeOf<string>();
  });
  it('canUndo / canRedo return boolean', () => {
    const h = new HistoryStack<number>(0);
    expectTypeOf(h.canUndo).returns.toEqualTypeOf<boolean>();
    expectTypeOf(h.canRedo).returns.toEqualTypeOf<boolean>();
  });
});
