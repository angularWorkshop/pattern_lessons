import { expectTypeOf } from 'vitest';
import type { UserRepository } from '../../src/user-repository.js';
import { InMemoryUserRepository } from '../../src/in-memory-user-repository.js';
import { PostgresUserRepository } from '../../src/postgres-user-repository.js';
import { UserService } from '../../src/user-service.js';
import type { User, UserRole } from '../../src/user-types.js';

describe('DIP type contracts', () => {
  it('UserRepository declares all four methods', () => {
    expectTypeOf<UserRepository>().toHaveProperty('save');
    expectTypeOf<UserRepository>().toHaveProperty('findById');
    expectTypeOf<UserRepository>().toHaveProperty('findByEmail');
    expectTypeOf<UserRepository>().toHaveProperty('findByRole');
  });

  it('UserRepository.save takes a User and returns Promise<void>', () => {
    expectTypeOf<UserRepository['save']>().parameters.toEqualTypeOf<[User]>();
    expectTypeOf<UserRepository['save']>().returns.toEqualTypeOf<Promise<void>>();
  });

  it('UserRepository.findById returns Promise<User | undefined>', () => {
    expectTypeOf<UserRepository['findById']>().returns.toEqualTypeOf<Promise<User | undefined>>();
  });

  it('UserRepository.findByEmail returns Promise<User | undefined>', () => {
    expectTypeOf<UserRepository['findByEmail']>().returns.toEqualTypeOf<Promise<User | undefined>>();
  });

  it('UserRepository.findByRole takes a UserRole and returns Promise<User[]>', () => {
    expectTypeOf<UserRepository['findByRole']>().parameters.toEqualTypeOf<[UserRole]>();
    expectTypeOf<UserRepository['findByRole']>().returns.toEqualTypeOf<Promise<User[]>>();
  });

  it('InMemoryUserRepository is assignable to UserRepository', () => {
    const repo: UserRepository = new InMemoryUserRepository();
    expectTypeOf(repo).toMatchTypeOf<UserRepository>();
  });

  it('PostgresUserRepository is assignable to UserRepository', () => {
    expectTypeOf<PostgresUserRepository>().toMatchTypeOf<UserRepository>();
  });

  it('UserService accepts a UserRepository in its constructor', () => {
    expectTypeOf(UserService).constructorParameters.toEqualTypeOf<[UserRepository]>();
  });
});
