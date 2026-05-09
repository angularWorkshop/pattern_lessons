import {
  CommandStack,
  Counter,
  IncrementCommand,
  DecrementCommand,
  TextField,
  SetTextCommand,
} from '../../src/command.js';

describe('CommandStack — counter undo/redo', () => {
  it('run executes the command and tracks for undo', () => {
    const counter = new Counter();
    const stack = new CommandStack();
    stack.run(new IncrementCommand(counter));
    expect(counter.get()).toBe(1);
    expect(stack.canUndo()).toBe(true);
    expect(stack.canRedo()).toBe(false);
  });

  it('undo reverses the last command', () => {
    const counter = new Counter();
    const stack = new CommandStack();
    stack.run(new IncrementCommand(counter));
    stack.run(new IncrementCommand(counter));
    stack.undo();
    expect(counter.get()).toBe(1);
    expect(stack.canRedo()).toBe(true);
  });

  it('redo replays the undone command', () => {
    const counter = new Counter();
    const stack = new CommandStack();
    stack.run(new IncrementCommand(counter));
    stack.run(new IncrementCommand(counter));
    stack.undo();
    stack.redo();
    expect(counter.get()).toBe(2);
  });

  it('mixed increment/decrement undo/redo', () => {
    const counter = new Counter();
    const stack = new CommandStack();
    stack.run(new IncrementCommand(counter)); // 1
    stack.run(new IncrementCommand(counter)); // 2
    stack.run(new DecrementCommand(counter)); // 1
    stack.undo(); // 2
    stack.undo(); // 1
    expect(counter.get()).toBe(1);
    stack.redo(); // 2
    expect(counter.get()).toBe(2);
  });
});

describe('CommandStack — text field undo/redo', () => {
  it('SetTextCommand restores previous value on undo', () => {
    const field = new TextField();
    const stack = new CommandStack();
    stack.run(new SetTextCommand(field, 'Hello'));
    stack.run(new SetTextCommand(field, 'Hello, World'));
    expect(field.get()).toBe('Hello, World');
    stack.undo();
    expect(field.get()).toBe('Hello');
    stack.undo();
    expect(field.get()).toBe('');
  });
});

describe('CommandStack — redo stack clears on a fresh run', () => {
  it('a new run() after undo wipes the redo path', () => {
    const counter = new Counter();
    const stack = new CommandStack();
    stack.run(new IncrementCommand(counter));
    stack.run(new IncrementCommand(counter));
    stack.undo();
    expect(stack.canRedo()).toBe(true);
    stack.run(new IncrementCommand(counter));
    expect(stack.canRedo()).toBe(false);
  });
});

describe('CommandStack — guard against empty stacks', () => {
  it('undo on an empty stack throws', () => {
    expect(() => new CommandStack().undo()).toThrow();
  });

  it('redo on an empty stack throws', () => {
    expect(() => new CommandStack().redo()).toThrow();
  });
});
