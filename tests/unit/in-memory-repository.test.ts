import { InMemoryUserRepository } from '../../src/in-memory-user-repository.js';
import type { User } from '../../src/user-types.js';

const sample: User = {
  id: 'user-x',
  email: 'x@example.com',
  name: 'X',
  role: 'editor',
  isActive: true,
};

describe('InMemoryUserRepository', () => {
  it('saves and finds by id', async () => {
    const repo = new InMemoryUserRepository();
    await repo.save(sample);
    const found = await repo.findById('user-x');
    expect(found?.email).toBe('x@example.com');
  });

  it('returns undefined for an unknown id', async () => {
    const repo = new InMemoryUserRepository();
    expect(await repo.findById('missing')).toBeUndefined();
  });

  it('finds by email', async () => {
    const repo = new InMemoryUserRepository();
    await repo.save(sample);
    const found = await repo.findByEmail('x@example.com');
    expect(found?.id).toBe('user-x');
  });

  it('returns undefined for an unknown email', async () => {
    const repo = new InMemoryUserRepository();
    expect(await repo.findByEmail('nope@example.com')).toBeUndefined();
  });

  it('finds multiple users by role', async () => {
    const repo = new InMemoryUserRepository();
    await repo.save({ ...sample, id: 'u1', email: 'u1@example.com', role: 'admin' });
    await repo.save({ ...sample, id: 'u2', email: 'u2@example.com', role: 'admin' });
    await repo.save({ ...sample, id: 'u3', email: 'u3@example.com', role: 'viewer' });

    const admins = await repo.findByRole('admin');
    expect(admins).toHaveLength(2);
  });

  it('overwrites a saved user with the same id', async () => {
    const repo = new InMemoryUserRepository();
    await repo.save(sample);
    await repo.save({ ...sample, name: 'Updated' });
    const found = await repo.findById('user-x');
    expect(found?.name).toBe('Updated');
  });
});
