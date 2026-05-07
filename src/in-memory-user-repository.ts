import type { User, UserRole } from './user-types.js';
import type { UserRepository } from './user-repository.js';

export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<string, User>();

  public async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return undefined;
  }

  public async findByRole(role: UserRole): Promise<User[]> {
    return Array.from(this.users.values()).filter((u) => u.role === role);
  }
}
