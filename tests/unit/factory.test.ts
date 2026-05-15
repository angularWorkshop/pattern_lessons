import { beforeEach } from 'vitest';
import {
  createBug,
  createFeature,
  createChore,
  resetIdCounter,
} from '../../src/factory/task-factory.js';

describe('Factory Method — task factories', () => {
  beforeEach(() => resetIdCounter());

  it('bug defaults to high priority', () => {
    const task = createBug({ title: 'NPE in checkout' });
    expect(task.type).toBe('bug');
    expect(task.priority).toBe('high');
    expect(task.status).toBe('todo');
    expect(task.assignee).toBeNull();
  });

  it('feature defaults to medium priority', () => {
    const task = createFeature({ title: 'Dark mode' });
    expect(task.type).toBe('feature');
    expect(task.priority).toBe('medium');
  });

  it('chore defaults to low priority', () => {
    const task = createChore({ title: 'Update deps' });
    expect(task.type).toBe('chore');
    expect(task.priority).toBe('low');
  });

  it('explicit priority overrides default', () => {
    const task = createBug({ title: 'x', priority: 'low' });
    expect(task.priority).toBe('low');
  });

  it('ids are unique', () => {
    const a = createBug({ title: 'a' });
    const b = createFeature({ title: 'b' });
    const c = createChore({ title: 'c' });
    expect(new Set([a.id, b.id, c.id]).size).toBe(3);
  });
});
