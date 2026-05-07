import type { User } from './user-types.js';

// TODO: complete this interface so it covers everything PostgresUserRepository
// already exposes. Right now only `save` is declared — add findById,
// findByEmail and findByRole. Then make UserService and the repositories
// implement / accept this interface.
export interface UserRepository {
  save(user: User): Promise<void>;
  // TODO: declare findById, findByEmail, findByRole
}
