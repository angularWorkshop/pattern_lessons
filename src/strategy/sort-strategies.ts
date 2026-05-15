import type { Task, Priority } from '../models/task.js';

export type SortStrategy = (a: Task, b: Task) => number;

// TODO: реализуй 3 стратегии:
//   - byDate: по createdAt по возрастанию (старые первые)
//   - byPriority: high -> medium -> low (high первый)
//   - byAssignee: alphabetical по assignee, null в конец
// Чистые функции — никаких мутаций.

export const byDate: SortStrategy = (_a, _b) => {
  throw new Error('Not implemented');
};

export const byPriority: SortStrategy = (_a, _b) => {
  throw new Error('Not implemented');
};

export const byAssignee: SortStrategy = (_a, _b) => {
  throw new Error('Not implemented');
};

// Утилита — приоритет в число для сортировки.
export function priorityRank(_priority: Priority): number {
  throw new Error('Not implemented');
}

export function sortTasks(tasks: readonly Task[], strategy: SortStrategy): Task[] {
  return [...tasks].sort(strategy);
}
