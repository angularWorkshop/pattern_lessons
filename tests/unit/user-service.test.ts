import { UserService } from '../../src/user-service.js';
import { InMemoryUserRepository } from '../../src/in-memory-user-repository.js';

describe('UserService — testable through DI', () => {
  it('registers a user via the injected repository', async () => {
    const repo = new InMemoryUserRepository();
    const service = new UserService(repo);

    const user = await service.register('alice@example.com', 'Alice', 'editor');

    expect(user.email).toBe('alice@example.com');
    expect(user.name).toBe('Alice');
    expect(user.role).toBe('editor');
    expect(user.isActive).toBe(true);
  });

  it('reads a freshly registered user back', async () => {
    const repo = new InMemoryUserRepository();
    const service = new UserService(repo);

    const created = await service.register('bob@example.com', 'Bob', 'viewer');
    const found = await service.getUser(created.id);

    expect(found?.email).toBe('bob@example.com');
  });

  it('rejects a duplicate email', async () => {
    const repo = new InMemoryUserRepository();
    const service = new UserService(repo);

    await service.register('charlie@example.com', 'Charlie', 'admin');
    await expect(
      service.register('charlie@example.com', 'Other', 'viewer'),
    ).rejects.toThrow(/already registered/);
  });

  it('lists users filtered by role', async () => {
    const repo = new InMemoryUserRepository();
    const service = new UserService(repo);

    await service.register('a1@example.com', 'A1', 'admin');
    await service.register('a2@example.com', 'A2', 'admin');
    await service.register('v1@example.com', 'V1', 'viewer');

    const admins = await service.listByRole('admin');
    expect(admins).toHaveLength(2);
    expect(admins.every((u) => u.role === 'admin')).toBe(true);
  });

  it('deactivates a user', async () => {
    const repo = new InMemoryUserRepository();
    const service = new UserService(repo);

    const user = await service.register('dora@example.com', 'Dora', 'editor');
    await service.deactivate(user.id);
    const refreshed = await service.getUser(user.id);

    expect(refreshed?.isActive).toBe(false);
  });

  it('throws when deactivating an unknown user', async () => {
    const repo = new InMemoryUserRepository();
    const service = new UserService(repo);

    await expect(service.deactivate('nope')).rejects.toThrow(/not found/);
  });
});
