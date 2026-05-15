import { beforeEach, vi } from 'vitest';
import { TaskTracker } from '../../src/facade/task-tracker.js';
import { resetIdCounter } from '../../src/factory/task-factory.js';
import { IllegalTransitionError } from '../../src/state/task-state.js';
import { byPriority } from '../../src/strategy/sort-strategies.js';

describe('Facade — TaskTracker integration', () => {
  beforeEach(() => resetIdCounter());

  it('addTask creates a task and emits task:added', () => {
    const tracker = new TaskTracker();
    const listener = vi.fn();
    tracker.events.on('task:added', listener);
    const task = tracker.addTask({ type: 'bug', title: 'Crash' });
    expect(tracker.list()).toHaveLength(1);
    expect(task.status).toBe('todo');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('undo removes the task that was added', () => {
    const tracker = new TaskTracker();
    tracker.addTask({ type: 'bug', title: 'Crash' });
    tracker.undo();
    expect(tracker.list()).toHaveLength(0);
  });

  it('redo re-adds the task', () => {
    const tracker = new TaskTracker();
    tracker.addTask({ type: 'feature', title: 'Dark mode' });
    tracker.undo();
    tracker.redo();
    expect(tracker.list()).toHaveLength(1);
  });

  it('moveTask validates legal transitions', () => {
    const tracker = new TaskTracker();
    const task = tracker.addTask({ type: 'chore', title: 'Upgrade' });
    tracker.moveTask(task.id, 'in_progress');
    expect(tracker.get(task.id)?.status).toBe('in_progress');
  });

  it('moveTask rejects illegal transitions', () => {
    const tracker = new TaskTracker();
    const task = tracker.addTask({ type: 'bug', title: 'X' });
    expect(() => tracker.moveTask(task.id, 'done')).toThrow(IllegalTransitionError);
  });

  it('undo a move restores prior status', () => {
    const tracker = new TaskTracker();
    const task = tracker.addTask({ type: 'bug', title: 'X' });
    tracker.moveTask(task.id, 'in_progress');
    tracker.undo();
    expect(tracker.get(task.id)?.status).toBe('todo');
  });

  it('renameTask + undo', () => {
    const tracker = new TaskTracker();
    const task = tracker.addTask({ type: 'bug', title: 'Old' });
    tracker.renameTask(task.id, 'New');
    expect(tracker.get(task.id)?.title).toBe('New');
    tracker.undo();
    expect(tracker.get(task.id)?.title).toBe('Old');
  });

  it('removeTask + undo restores the task', () => {
    const tracker = new TaskTracker();
    const task = tracker.addTask({ type: 'feature', title: 'Y' });
    tracker.removeTask(task.id);
    expect(tracker.list()).toHaveLength(0);
    tracker.undo();
    expect(tracker.get(task.id)).toBeDefined();
  });

  it('emits task:moved on moveTask', () => {
    const tracker = new TaskTracker();
    const listener = vi.fn();
    tracker.events.on('task:moved', listener);
    const task = tracker.addTask({ type: 'bug', title: 'X' });
    tracker.moveTask(task.id, 'in_progress');
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0]?.[0]).toMatchObject({ from: 'todo', to: 'in_progress' });
  });

  it('list with Strategy sorts by priority', () => {
    const tracker = new TaskTracker();
    tracker.addTask({ type: 'chore', title: 'a' });   // low
    tracker.addTask({ type: 'bug', title: 'b' });     // high
    tracker.addTask({ type: 'feature', title: 'c' }); // medium
    const sorted = tracker.list(byPriority).map((t) => t.title);
    expect(sorted).toEqual(['b', 'c', 'a']);
  });
});
