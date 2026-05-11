// Async iterator для постраничного API.
// Под капотом — fetchPage(cursor) отдаёт страницу + nextCursor.
// Снаружи код пишет for await...of и не думает про страницы.

export interface User {
  id: string;
  name: string;
}

export interface Page {
  users: readonly User[];
  nextCursor: string | null;
}

// Эмулятор пагинированного API. В тестах подменяется конкретными данными.
export interface ApiClient {
  fetchPage(cursor: string | null): Promise<Page>;
}

// TODO: реализовать async generator fetchAllUsers(api).
// Внутри:
//   let cursor: string | null = null;
//   do {
//     const page = await api.fetchPage(cursor);
//     for (const user of page.users) yield user;
//     cursor = page.nextCursor;
//   } while (cursor !== null);
//
// Так получаем for-await-of по всем пользователям без знания про страницы.
export async function* fetchAllUsers(_api: ApiClient): AsyncGenerator<User, void, unknown> {
  throw new Error('fetchAllUsers is not implemented yet');
}
