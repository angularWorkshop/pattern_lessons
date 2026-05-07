export interface TodoItem {
  id: string;
  title: string;
  done: boolean;
}

export function createTodo(title: string): TodoItem {
  // TODO: return a normalized TodoItem object
  throw new Error('Not implemented');
}

export function toggleTodo(item: TodoItem): TodoItem {
  // TODO: return a new TodoItem with inverted `done`
  throw new Error('Not implemented');
}

