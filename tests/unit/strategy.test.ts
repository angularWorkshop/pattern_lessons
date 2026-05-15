import { byDate, byPriority, byAssignee, sortTasks } from '../../src/strategy/sort-strategies.js';
import type { Task } from '../../src/models/task.js';

const make = (over: Partial<Task>): Task => ({
  id: over.id ?? 'x',
  type: 'feature',
  title: over.title ?? 't',
  status: 'todo',
  priority: over.priority ?? 'medium',
  assignee: over.assignee ?? null,
  createdAt: over.createdAt ?? 0,
});

describe('Strategy — sort strategies', () => {
  it('sorts by date ascending', () => {
    const tasks = [make({ id: 'b', createdAt: 2 }), make({ id: 'a', createdAt: 1 })];
    expect(sortTasks(tasks, byDate).map((t) => t.id)).toEqual(['a', 'b']);
  });

  it('sorts by priority high-first', () => {
    const tasks = [
      make({ id: 'low', priority: 'low' }),
      make({ id: 'high', priority: 'high' }),
      make({ id: 'med', priority: 'medium' }),
    ];
    expect(sortTasks(tasks, byPriority).map((t) => t.id)).toEqual(['high', 'med', 'low']);
  });

  it('sorts by assignee alphabetically, nulls last', () => {
    const tasks = [
      make({ id: '1', assignee: null }),
      make({ id: '2', assignee: 'bob' }),
      make({ id: '3', assignee: 'alice' }),
    ];
    expect(sortTasks(tasks, byAssignee).map((t) => t.id)).toEqual(['3', '2', '1']);
  });

  it('does not mutate the input', () => {
    const tasks = [make({ id: 'b', createdAt: 2 }), make({ id: 'a', createdAt: 1 })];
    const original = tasks.map((t) => t.id);
    sortTasks(tasks, byDate);
    expect(tasks.map((t) => t.id)).toEqual(original);
  });
});
