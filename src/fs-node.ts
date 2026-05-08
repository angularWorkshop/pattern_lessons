// Composite: и File, и Folder реализуют общий интерфейс FsNode.
// Любой обход (размер, поиск) работает одинаково на листе и на группе.
export interface FsNode {
  readonly name: string;
  getTotalSize(): number;
  findByName(name: string): readonly FsNode[];
}

export class File implements FsNode {
  public readonly name: string;
  private readonly size: number;

  public constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  // TODO: getTotalSize возвращает this.size
  public getTotalSize(): number {
    throw new Error('File.getTotalSize is not implemented yet');
  }

  // TODO: findByName возвращает [this] если name совпадает, иначе []
  public findByName(_name: string): readonly FsNode[] {
    throw new Error('File.findByName is not implemented yet');
  }
}

export class Folder implements FsNode {
  public readonly name: string;
  private readonly children: FsNode[];

  public constructor(name: string, children: FsNode[] = []) {
    this.name = name;
    this.children = children;
  }

  public add(node: FsNode): void {
    this.children.push(node);
  }

  // TODO: getTotalSize рекурсивно суммирует размеры детей
  public getTotalSize(): number {
    throw new Error('Folder.getTotalSize is not implemented yet');
  }

  // TODO: findByName ищет рекурсивно во всех детях.
  // Если имя самой папки совпадает — папка тоже идёт в результат.
  public findByName(_name: string): readonly FsNode[] {
    throw new Error('Folder.findByName is not implemented yet');
  }
}
