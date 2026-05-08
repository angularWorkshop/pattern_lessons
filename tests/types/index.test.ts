import { expectTypeOf } from 'vitest';
import { VirtualList, type VisibleRow } from '../../src/virtual-list.js';

describe('VirtualList type contracts', () => {
  it('scrollTo returns readonly VisibleRow<T>[]', () => {
    const list = new VirtualList<number>([1, 2, 3], 1);
    expectTypeOf(list.scrollTo(0)).toEqualTypeOf<readonly VisibleRow<number>[]>();
  });
  it('VisibleRow has nodeId, item, index', () => {
    expectTypeOf<VisibleRow<string>>().toEqualTypeOf<{
      nodeId: number;
      item: string;
      index: number;
    }>();
  });
});
