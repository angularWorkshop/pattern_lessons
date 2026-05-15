import type { Command } from '../../src/commands/command.js';
import { CommandStack } from '../../src/commands/command-stack.js';

function makeCmd(label: string, log: string[]): Command {
  return {
    label,
    execute: () => log.push(`do:${label}`),
    undo: () => log.push(`undo:${label}`),
  };
}

describe('Command — CommandStack undo/redo', () => {
  it('runs execute when do() is called', () => {
    const log: string[] = [];
    const stack = new CommandStack();
    stack.do(makeCmd('a', log));
    expect(log).toEqual(['do:a']);
  });

  it('undo runs undo() in reverse order', () => {
    const log: string[] = [];
    const stack = new CommandStack();
    stack.do(makeCmd('a', log));
    stack.do(makeCmd('b', log));
    stack.undo();
    stack.undo();
    expect(log).toEqual(['do:a', 'do:b', 'undo:b', 'undo:a']);
  });

  it('redo re-runs the undone command', () => {
    const log: string[] = [];
    const stack = new CommandStack();
    stack.do(makeCmd('a', log));
    stack.undo();
    stack.redo();
    expect(log).toEqual(['do:a', 'undo:a', 'do:a']);
  });

  it('new do() clears redo stack', () => {
    const log: string[] = [];
    const stack = new CommandStack();
    stack.do(makeCmd('a', log));
    stack.undo();
    stack.do(makeCmd('b', log));
    expect(stack.canRedo()).toBe(false);
    stack.undo();
    expect(log).toEqual(['do:a', 'undo:a', 'do:b', 'undo:b']);
  });

  it('undo/redo on empty stacks is no-op', () => {
    const stack = new CommandStack();
    expect(() => stack.undo()).not.toThrow();
    expect(() => stack.redo()).not.toThrow();
    expect(stack.canUndo()).toBe(false);
    expect(stack.canRedo()).toBe(false);
  });

  it('history reflects labels', () => {
    const log: string[] = [];
    const stack = new CommandStack();
    stack.do(makeCmd('a', log));
    stack.do(makeCmd('b', log));
    stack.undo();
    const h = stack.history();
    expect(h.undone).toEqual(['a']);
    expect(h.pending).toEqual(['b']);
  });

  it('clear empties both stacks', () => {
    const log: string[] = [];
    const stack = new CommandStack();
    stack.do(makeCmd('a', log));
    stack.undo();
    stack.clear();
    expect(stack.canUndo()).toBe(false);
    expect(stack.canRedo()).toBe(false);
  });
});
