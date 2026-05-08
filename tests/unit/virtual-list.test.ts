import { VirtualList } from '../../src/virtual-list.js';

const buildItems = (n: number): string[] => Array.from({ length: n }, (_, i) => `item-${i}`);

describe('VirtualList — visible window', () => {
  it('returns viewportSize visible rows on first scroll', () => {
    const list = new VirtualList(buildItems(100_000), 50);
    const visible = list.scrollTo(0);
    expect(visible).toHaveLength(50);
    expect(visible[0]?.item).toBe('item-0');
    expect(visible[49]?.item).toBe('item-49');
  });

  it('returns the right slice for a non-zero offset', () => {
    const list = new VirtualList(buildItems(100_000), 50);
    const visible = list.scrollTo(1000);
    expect(visible).toHaveLength(50);
    expect(visible[0]?.item).toBe('item-1000');
    expect(visible[49]?.item).toBe('item-1049');
  });

  it('clamps the visible window at the end of the list', () => {
    const list = new VirtualList(buildItems(100), 50);
    const visible = list.scrollTo(80);
    expect(visible).toHaveLength(20);
    expect(visible[0]?.item).toBe('item-80');
    expect(visible.at(-1)?.item).toBe('item-99');
  });
});

describe('VirtualList — flyweight: pool stays bounded', () => {
  it('after multiple scrolls the pool size never exceeds viewportSize', () => {
    const list = new VirtualList(buildItems(100_000), 50);
    list.scrollTo(0);
    list.scrollTo(500);
    list.scrollTo(1000);
    list.scrollTo(99_950);
    expect(list.getPoolSize()).toBeLessThanOrEqual(50);
  });

  it('total created nodes is at most viewportSize even after a full sweep', () => {
    const list = new VirtualList(buildItems(100_000), 50);
    for (let offset = 0; offset < 100_000; offset += 50) {
      list.scrollTo(offset);
    }
    expect(list.getTotalNodesCreated()).toBeLessThanOrEqual(50);
  });

  it('node ids are stable across scrolls (pool is reused, not recreated)', () => {
    const list = new VirtualList(buildItems(1000), 5);
    const firstView = list.scrollTo(0);
    const secondView = list.scrollTo(100);
    const firstIds = firstView.map((row) => row.nodeId);
    const secondIds = secondView.map((row) => row.nodeId);
    expect(firstIds).toEqual(secondIds); // those exact nodes were reused
  });
});

describe('VirtualList — content updates correctly', () => {
  it('row content changes after scroll', () => {
    const list = new VirtualList(buildItems(1000), 5);
    list.scrollTo(0);
    const after = list.scrollTo(100);
    expect(after.map((r) => r.item)).toEqual([
      'item-100',
      'item-101',
      'item-102',
      'item-103',
      'item-104',
    ]);
  });
});
