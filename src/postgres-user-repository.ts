import type { User, UserRole } from './user-types.js';
import type { UserRepository } from './user-repository.js';

// Production stand-in. In a real codebase this would talk to Postgres
// through pg / Prisma / Drizzle. Here it intentionally fails: the whole
// point of DIP is to be able to test UserService without spinning up a DB.
export class PostgresUserRepository implements UserRepository {
  private readonly connectionString: string;

  public constructor(connectionString: string = process.env['POSTGRES_URL'] ?? '') {
    if (!connectionString) {
      throw new Error('POSTGRES_URL is required to use PostgresUserRepository');
    }
    this.connectionString = connectionString;
  }

  public async save(_user: User): Promise<void> {
    throw new Error(`PostgresUserRepository.save would talk to ${this.connectionString}`);
  }

  public async findById(_id: string): Promise<User | undefined> {
    throw new Error(`PostgresUserRepository.findById would talk to ${this.connectionString}`);
  }

  public async findByEmail(_email: string): Promise<User | undefined> {
    throw new Error(`PostgresUserRepository.findByEmail would talk to ${this.connectionString}`);
  }

  public async findByRole(_role: UserRole): Promise<User[]> {
    throw new Error(`PostgresUserRepository.findByRole would talk to ${this.connectionString}`);
  }
}
