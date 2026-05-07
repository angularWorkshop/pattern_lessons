import type { User, UserRole } from './user-types.js';

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByRole(role: UserRole): Promise<User[]>;
}
