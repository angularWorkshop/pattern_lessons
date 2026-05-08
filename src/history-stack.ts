export class HistoryStack<T> {
  protected current: T;
  protected undoStack: T[] = [];
  protected redoStack: T[] = [];

  public constructor(initial: T) {
    this.current = structuredClone(initial);
  }

  public getState(): T {
    return structuredClone(this.current);
  }

  public push(state: T): void {
    this.undoStack.push(structuredClone(this.current));
    this.current = structuredClone(state);
    this.redoStack.length = 0;
  }

  public undo(): T {
    if (this.undoStack.length === 0) {
      throw new Error('HistoryStack.undo: nothing to undo');
    }
    this.redoStack.push(structuredClone(this.current));
    this.current = this.undoStack.pop() as T;
    return structuredClone(this.current);
  }

  public redo(): T {
    if (this.redoStack.length === 0) {
      throw new Error('HistoryStack.redo: nothing to redo');
    }
    this.undoStack.push(structuredClone(this.current));
    this.current = this.redoStack.pop() as T;
    return structuredClone(this.current);
  }

  public canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  public canRedo(): boolean {
    return this.redoStack.length > 0;
  }
}
