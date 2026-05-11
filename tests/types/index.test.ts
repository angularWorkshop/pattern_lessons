import { expectTypeOf } from 'vitest';
import { fetchAllUsers, type ApiClient, type User } from '../../src/pagination.js';

describe('fetchAllUsers type contracts', () => {
  it('returns AsyncGenerator<User, void, unknown>', () => {
    const api: ApiClient = { async fetchPage() { return { users: [], nextCursor: null }; } };
    expectTypeOf(fetchAllUsers(api)).toEqualTypeOf<AsyncGenerator<User, void, unknown>>();
  });
});
