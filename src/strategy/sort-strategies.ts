import type { Task, Priority } from '../models/task.js';

export type SortStrategy = (a: Task, b: Task) => number;

export function priorityRank(priority: Priority): number {
  switch (priority) {
    case 'high': return 0;
    case 'medium': return 1;
    case 'low': return 2;
  }
}

export const byDate: SortStrategy = (a, b) => a.createdAt - b.createdAt;

export const byPriority: SortStrategy = (a, b) => priorityRank(a.priority) - priorityRank(b.priority);

export const byAssignee: SortStrategy = (a, b) => {
  if (a.assignee === null && b.assignee === null) return 0;
  if (a.assignee === null) return 1;
  if (b.assignee === null) return -1;
  return a.assignee.localeCompare(b.assignee);
};

export function sortTasks(tasks: readonly Task[], strategy: SortStrategy): Task[] {
  return [...tasks].sort(strategy);
}
