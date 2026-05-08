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

  public getTotalSize(): number {
    return this.size;
  }

  public findByName(name: string): readonly FsNode[] {
    return this.name === name ? [this] : [];
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

  public getTotalSize(): number {
    return this.children.reduce((sum, child) => sum + child.getTotalSize(), 0);
  }

  public findByName(name: string): readonly FsNode[] {
    const results: FsNode[] = [];
    if (this.name === name) {
      results.push(this);
    }
    for (const child of this.children) {
      results.push(...child.findByName(name));
    }
    return results;
  }
}
