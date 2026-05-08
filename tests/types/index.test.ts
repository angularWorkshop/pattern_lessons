import { expectTypeOf } from 'vitest';
import { File, Folder, type FsNode } from '../../src/fs-node.js';

describe('Composite type contracts', () => {
  it('File implements FsNode', () => {
    expectTypeOf<File>().toMatchTypeOf<FsNode>();
  });
  it('Folder implements FsNode', () => {
    expectTypeOf<Folder>().toMatchTypeOf<FsNode>();
  });
  it('getTotalSize returns number on every node', () => {
    expectTypeOf<FsNode['getTotalSize']>().returns.toEqualTypeOf<number>();
  });
  it('findByName returns a readonly list of FsNode', () => {
    expectTypeOf<FsNode['findByName']>().returns.toEqualTypeOf<readonly FsNode[]>();
  });
});
