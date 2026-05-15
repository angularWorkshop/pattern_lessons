export type TaskType = 'bug' | 'feature' | 'chore';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  status: TaskStatus;
  priority: Priority;
  assignee: string | null;
  createdAt: number;
}
