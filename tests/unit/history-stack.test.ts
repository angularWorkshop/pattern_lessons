import { HistoryStack } from '../../src/history-stack.js';

interface Note { title: string; tags: string[] }

describe('HistoryStack — undo/redo basics', () => {
  it('initial state is reachable', () => {
    const h = new HistoryStack({ count: 0 });
    expect(h.getState()).toEqual({ count: 0 });
    expect(h.canUndo()).toBe(false);
    expect(h.canRedo()).toBe(false);
  });

  it('push moves current forward and unlocks undo', () => {
    const h = new HistoryStack({ count: 0 });
    h.push({ count: 1 });
    expect(h.getState()).toEqual({ count: 1 });
    expect(h.canUndo()).toBe(true);
    expect(h.canRedo()).toBe(false);
  });

  it('undo returns to the previous state', () => {
    const h = new HistoryStack({ count: 0 });
    h.push({ count: 1 });
    h.push({ count: 2 });
    expect(h.undo()).toEqual({ count: 1 });
    expect(h.getState()).toEqual({ count: 1 });
    expect(h.canRedo()).toBe(true);
  });

  it('redo restores the undone state', () => {
    const h = new HistoryStack({ count: 0 });
    h.push({ count: 1 });
    h.push({ count: 2 });
    h.undo();
    expect(h.redo()).toEqual({ count: 2 });
  });

  it('a fresh push after undo clears the redo stack', () => {
    const h = new HistoryStack({ count: 0 });
    h.push({ count: 1 });
    h.push({ count: 2 });
    h.undo();
    h.push({ count: 99 });
    expect(h.canRedo()).toBe(false);
  });

  it('throws when undo is called with empty stack', () => {
    const h = new HistoryStack({ count: 0 });
    expect(() => h.undo()).toThrow();
  });

  it('throws when redo is called with empty stack', () => {
    const h = new HistoryStack({ count: 0 });
    expect(() => h.redo()).toThrow();
  });
});

describe('HistoryStack — clones isolate snapshots', () => {
  it('mutating the current state does not corrupt past snapshots', () => {
    const initial: Note = { title: 'first', tags: ['a'] };
    const h = new HistoryStack<Note>(initial);
    h.push({ title: 'second', tags: ['b'] });

    const current = h.getState();
    current.tags.push('c');           // мутация текущего
    expect(h.undo()).toEqual({ title: 'first', tags: ['a'] }); // прошлое не задето
  });

  it('mutating the pushed value does not corrupt the snapshot', () => {
    const h = new HistoryStack<Note>({ title: 'first', tags: [] });
    const next: Note = { title: 'second', tags: ['hot'] };
    h.push(next);
    next.tags.push('cold');            // мутация после push
    expect(h.getState()).toEqual({ title: 'second', tags: ['hot'] });
  });

  it('undo and redo return independent objects from current', () => {
    const h = new HistoryStack({ items: [1] });
    h.push({ items: [1, 2] });
    const undone = h.undo();
    undone.items.push(99);
    const redone = h.redo();
    expect(redone.items).toEqual([1, 2]); // не зацепило мутацию undone
  });
});
