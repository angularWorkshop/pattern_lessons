import { expectTypeOf } from 'vitest';
import { TaskTracker } from '../../src/facade/task-tracker.js';
import type { Task, TaskStatus, TaskType } from '../../src/models/task.js';
import type { TrackerEvent } from '../../src/observer/event-bus.js';
import type { SortStrategy } from '../../src/strategy/sort-strategies.js';

describe('Capstone — public API types', () => {
  it('TaskTracker.addTask returns Task', () => {
    const tracker = new TaskTracker();
    expectTypeOf(tracker.addTask({ type: 'bug', title: 'x' })).toEqualTypeOf<Task>();
  });

  it('TaskTracker.moveTask requires TaskStatus', () => {
    const tracker = new TaskTracker();
    expectTypeOf(tracker.moveTask).parameters.toEqualTypeOf<[string, TaskStatus]>();
  });

  it('TrackerEvent is discriminated by type', () => {
    expectTypeOf<TrackerEvent['type']>().toEqualTypeOf<
      'task:added' | 'task:removed' | 'task:updated' | 'task:moved'
    >();
  });

  it('TaskType is exactly the GoF list', () => {
    expectTypeOf<TaskType>().toEqualTypeOf<'bug' | 'feature' | 'chore'>();
  });

  it('SortStrategy is a comparator', () => {
    expectTypeOf<SortStrategy>().toEqualTypeOf<(a: Task, b: Task) => number>();
  });
});
