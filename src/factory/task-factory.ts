import type { Task, Priority } from '../models/task.js';

export interface TaskInput {
  title: string;
  priority?: Priority;
  assignee?: string | null;
}

// TODO: реализуй фабрики, чтобы каждый тип задач получил свои дефолты:
//   - bug: priority по умолчанию 'high'
//   - feature: priority по умолчанию 'medium'
//   - chore: priority по умолчанию 'low'
// Статус всегда 'todo', assignee — null если не указан.
// id генерируй из глобального счётчика (`nextId()`).

let counter = 0;
export function nextId(): string {
  counter += 1;
  return `task-${counter}`;
}

export function resetIdCounter(): void {
  counter = 0;
}

export function createBug(_input: TaskInput): Task {
  throw new Error('Not implemented');
}

export function createFeature(_input: TaskInput): Task {
  throw new Error('Not implemented');
}

export function createChore(_input: TaskInput): Task {
  throw new Error('Not implemented');
}
