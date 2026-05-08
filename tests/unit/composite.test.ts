import { File, Folder } from '../../src/fs-node.js';

describe('File leaf', () => {
  it('total size equals own size', () => {
    expect(new File('a.txt', 100).getTotalSize()).toBe(100);
  });
  it('findByName returns the file when name matches', () => {
    const file = new File('readme.md', 50);
    expect(file.findByName('readme.md')).toEqual([file]);
  });
  it('findByName returns empty when no match', () => {
    expect(new File('a.txt', 0).findByName('b.txt')).toEqual([]);
  });
});

describe('Folder group', () => {
  it('empty folder has size 0', () => {
    expect(new Folder('empty').getTotalSize()).toBe(0);
  });

  it('folder size = sum of children sizes', () => {
    const folder = new Folder('docs', [
      new File('a.txt', 30),
      new File('b.txt', 70),
    ]);
    expect(folder.getTotalSize()).toBe(100);
  });

  it('nested folders are summed recursively', () => {
    const inner = new Folder('inner', [new File('x', 25), new File('y', 5)]);
    const outer = new Folder('outer', [inner, new File('z', 10)]);
    expect(outer.getTotalSize()).toBe(40);
  });

  it('add() extends a folder', () => {
    const folder = new Folder('docs');
    folder.add(new File('new.txt', 15));
    expect(folder.getTotalSize()).toBe(15);
  });

  it('findByName traverses children', () => {
    const target = new File('target.txt', 1);
    const folder = new Folder('root', [
      new File('other.txt', 1),
      new Folder('nested', [target]),
    ]);
    const results = folder.findByName('target.txt');
    expect(results).toContain(target);
  });

  it('findByName returns the folder itself when its name matches', () => {
    const folder = new Folder('docs', [new File('a.txt', 1)]);
    expect(folder.findByName('docs')).toContain(folder);
  });

  it('findByName collects multiple matches', () => {
    const a1 = new File('config.json', 1);
    const a2 = new File('config.json', 2);
    const root = new Folder('root', [a1, new Folder('nested', [a2])]);
    expect(root.findByName('config.json')).toHaveLength(2);
  });
});

describe('FsNode interface — same operations on leaf and group', () => {
  it('client code does not care whether a node is a File or a Folder', () => {
    const nodes = [new File('one', 5), new Folder('two', [new File('inner', 3)])];
    const total = nodes.reduce((sum, node) => sum + node.getTotalSize(), 0);
    expect(total).toBe(8);
  });
});
