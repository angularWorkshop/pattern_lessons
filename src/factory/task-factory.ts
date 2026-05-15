import type { Task, Priority } from '../models/task.js';

export interface TaskInput {
  title: string;
  priority?: Priority;
  assignee?: string | null;
}

let counter = 0;
export function nextId(): string {
  counter += 1;
  return `task-${counter}`;
}

export function resetIdCounter(): void {
  counter = 0;
}

function base(input: TaskInput, defaults: Pick<Task, 'type' | 'priority'>): Task {
  return {
    id: nextId(),
    type: defaults.type,
    title: input.title,
    status: 'todo',
    priority: input.priority ?? defaults.priority,
    assignee: input.assignee ?? null,
    createdAt: Date.now(),
  };
}

export function createBug(input: TaskInput): Task {
  return base(input, { type: 'bug', priority: 'high' });
}

export function createFeature(input: TaskInput): Task {
  return base(input, { type: 'feature', priority: 'medium' });
}

export function createChore(input: TaskInput): Task {
  return base(input, { type: 'chore', priority: 'low' });
}
