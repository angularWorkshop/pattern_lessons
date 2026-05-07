import type { User, UserRole } from './user-types.js';
import type { UserRepository } from './user-repository.js';

export class UserService {
  private readonly repo: UserRepository;

  public constructor(repository: UserRepository) {
    this.repo = repository;
  }

  public async register(email: string, name: string, role: UserRole): Promise<User> {
    const existing = await this.repo.findByEmail(email);
    if (existing) {
      throw new Error(`Email ${email} is already registered`);
    }
    const user: User = {
      id: `user-${email}`,
      email,
      name,
      role,
      isActive: true,
    };
    await this.repo.save(user);
    return user;
  }

  public async getUser(id: string): Promise<User | undefined> {
    return this.repo.findById(id);
  }

  public async listByRole(role: UserRole): Promise<User[]> {
    return this.repo.findByRole(role);
  }

  public async deactivate(id: string): Promise<void> {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new Error(`User ${id} not found`);
    }
    await this.repo.save({ ...user, isActive: false });
  }
}
