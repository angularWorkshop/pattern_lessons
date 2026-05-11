import { fetchAllUsers, type ApiClient, type User } from '../../src/pagination.js';

const buildApi = (pages: { users: User[]; nextCursor: string | null }[]): {
  api: ApiClient;
  callCount: () => number;
  cursorsRequested: () => (string | null)[];
} => {
  const cursors: (string | null)[] = [];
  let calls = 0;
  const api: ApiClient = {
    async fetchPage(cursor) {
      cursors.push(cursor);
      const idx = calls++;
      const page = pages[idx];
      if (!page) {
        throw new Error('No more pages mocked');
      }
      return page;
    },
  };
  return { api, callCount: () => calls, cursorsRequested: () => cursors };
};

describe('fetchAllUsers — async iteration over paginated API', () => {
  it('iterates through a single page', async () => {
    const { api } = buildApi([
      { users: [{ id: '1', name: 'A' }, { id: '2', name: 'B' }], nextCursor: null },
    ]);
    const collected: User[] = [];
    for await (const user of fetchAllUsers(api)) {
      collected.push(user);
    }
    expect(collected.map((u) => u.id)).toEqual(['1', '2']);
  });

  it('iterates through multiple pages', async () => {
    const { api, callCount } = buildApi([
      { users: [{ id: '1', name: 'A' }], nextCursor: 'p2' },
      { users: [{ id: '2', name: 'B' }], nextCursor: 'p3' },
      { users: [{ id: '3', name: 'C' }], nextCursor: null },
    ]);
    const ids: string[] = [];
    for await (const user of fetchAllUsers(api)) {
      ids.push(user.id);
    }
    expect(ids).toEqual(['1', '2', '3']);
    expect(callCount()).toBe(3);
  });

  it('passes received cursor to the next fetch', async () => {
    const { api, cursorsRequested } = buildApi([
      { users: [], nextCursor: 'cursor-a' },
      { users: [], nextCursor: 'cursor-b' },
      { users: [], nextCursor: null },
    ]);
    for await (const _u of fetchAllUsers(api)) {
      void _u;
    }
    expect(cursorsRequested()).toEqual([null, 'cursor-a', 'cursor-b']);
  });

  it('handles an empty initial page', async () => {
    const { api } = buildApi([{ users: [], nextCursor: null }]);
    const collected: User[] = [];
    for await (const u of fetchAllUsers(api)) {
      collected.push(u);
    }
    expect(collected).toEqual([]);
  });

  it('early break does not request more pages', async () => {
    const { api, callCount } = buildApi([
      { users: [{ id: '1', name: 'A' }], nextCursor: 'p2' },
      { users: [{ id: '2', name: 'B' }], nextCursor: null },
    ]);
    for await (const u of fetchAllUsers(api)) {
      void u;
      break;
    }
    expect(callCount()).toBe(1);
  });
});
