import type { User, UserRole } from './user-types.js';
import type { UserRepository } from './user-repository.js';

// TODO: implement an in-memory version of UserRepository. Keep users
// inside a `Map<string, User>` keyed by id. Use it in tests instead of
// the real Postgres-backed repository.
export class InMemoryUserRepository implements UserRepository {
  public async save(_user: User): Promise<void> {
    throw new Error('InMemoryUserRepository.save is not implemented yet');
  }

  // TODO: add findById(id), findByEmail(email), findByRole(role)
  // once the UserRepository interface declares them.
  public async findById(_id: string): Promise<User | undefined> {
    throw new Error('InMemoryUserRepository.findById is not implemented yet');
  }

  public async findByEmail(_email: string): Promise<User | undefined> {
    throw new Error('InMemoryUserRepository.findByEmail is not implemented yet');
  }

  public async findByRole(_role: UserRole): Promise<User[]> {
    throw new Error('InMemoryUserRepository.findByRole is not implemented yet');
  }
}
