import type { TaskStatus } from '../models/task.js';

const LEGAL: Record<TaskStatus, Set<TaskStatus>> = {
  todo: new Set(['todo', 'in_progress']),
  in_progress: new Set(['in_progress', 'todo', 'done']),
  done: new Set(['done', 'in_progress']),
};

export class IllegalTransitionError extends Error {
  public constructor(
    public readonly from: TaskStatus,
    public readonly to: TaskStatus,
  ) {
    super(`Illegal transition: ${from} -> ${to}`);
    this.name = 'IllegalTransitionError';
  }
}

export function assertTransition(from: TaskStatus, to: TaskStatus): void {
  if (!LEGAL[from].has(to)) {
    throw new IllegalTransitionError(from, to);
  }
}
