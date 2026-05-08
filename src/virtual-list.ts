// Flyweight: виртуализированный список.
// Список из 100 000 элементов, но в памяти живёт только ~viewportSize нод.
// При прокрутке существующие ноды переиспользуются с новым контентом.

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

  // TODO: scrollTo(offset).
  // Возвращает массив VisibleRow для индексов [offset, offset + viewportSize)
  // (clamp к items.length).
  // Логика:
  // - Для каждого видимого индекса i:
  //   - Возьми i-й слот пула (создай node если ещё нет, увеличь totalNodesCreated)
  //   - Запиши items[i] в node.currentItem, index в node.currentIndex
  //   - Положи { nodeId, item, index } в результат
  // - Размер пула не превышает viewportSize.
  public scrollTo(_offset: number): readonly VisibleRow<T>[] {
    throw new Error('VirtualList.scrollTo is not implemented yet');
  }

  public getTotalNodesCreated(): number {
    return this.totalNodesCreated;
  }

  public getPoolSize(): number {
    return this.pool.length;
  }
}
