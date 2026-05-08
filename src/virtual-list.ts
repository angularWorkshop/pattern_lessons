export interface VisibleRow<T> {
  nodeId: number;
  item: T;
  index: number;
}

interface PoolNode<T> {
  id: number;
  currentItem: T | null;
  currentIndex: number | null;
}

export class VirtualList<T> {
  private readonly items: readonly T[];
  private readonly viewportSize: number;
  private readonly pool: PoolNode<T>[] = [];
  private nextNodeId = 1;
  private totalNodesCreated = 0;

  public constructor(items: readonly T[], viewportSize: number) {
    this.items = items;
    this.viewportSize = viewportSize;
  }

  public scrollTo(offset: number): readonly VisibleRow<T>[] {
    const start = Math.max(0, offset);
    const end = Math.min(this.items.length, start + this.viewportSize);
    const result: VisibleRow<T>[] = [];

    for (let i = 0; i < end - start; i++) {
      const itemIndex = start + i;
      const item = this.items[itemIndex] as T;

      let node = this.pool[i];
      if (!node) {
        node = { id: this.nextNodeId++, currentItem: null, currentIndex: null };
        this.pool[i] = node;
        this.totalNodesCreated++;
      }
      node.currentItem = item;
      node.currentIndex = itemIndex;

      result.push({ nodeId: node.id, item, index: itemIndex });
    }
    return result;
  }

  public getTotalNodesCreated(): number {
    return this.totalNodesCreated;
  }

  public getPoolSize(): number {
    return this.pool.length;
  }
}
