import { expect, test } from 'vitest';
import { createTodo, toggleTodo, type TodoItem } from '../../src/index';

// Prefer direct compile-time assignments here: they usually produce clearer
// TypeScript errors than generic helper assertions inside the terminal.
const createTodoReturnMustBeTodoItem: TodoItem = null as unknown as ReturnType<typeof createTodo>;
const toggleTodoReturnMustBeTodoItem: TodoItem = null as unknown as ReturnType<typeof toggleTodo>;

void createTodoReturnMustBeTodoItem;
void toggleTodoReturnMustBeTodoItem;

test('type contracts compile', () => {
  expect(true).toBe(true);
});
