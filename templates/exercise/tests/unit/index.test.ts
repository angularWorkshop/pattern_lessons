import { createTodo, toggleTodo } from '../../src/index';

describe('todo runtime behavior', () => {
  it('creates a todo item', () => {
    expect(createTodo('Read TS docs')).toEqual({
      id: 'read-ts-docs',
      title: 'Read TS docs',
      done: false,
    });
  });

  it('toggles the done flag', () => {
    expect(
      toggleTodo({
        id: 'read-ts-docs',
        title: 'Read TS docs',
        done: false,
      })
    ).toEqual({
      id: 'read-ts-docs',
      title: 'Read TS docs',
      done: true,
    });
  });
});

