// HistoryStack — undo/redo через клонирование (Prototype-применение).
// Каждый push снимает снапшот текущего состояния, чтобы потом undo
// мог вернуть именно ту версию, какой состояние было на момент push.

// TODO: реализовать класс. Внутри — два стека: undoStack и redoStack.
// На push: складываем клон текущего состояния в undoStack, redoStack чистим.
// На undo: вытаскиваем клон из undoStack, текущее в redoStack, возвращаем клон.
// На redo: симметрично — вытаскиваем из redoStack, текущее в undoStack.
//
// canUndo / canRedo помогают UI понимать доступность кнопок.
export class HistoryStack<T> {
  protected current: T;
  protected undoStack: T[] = [];
  protected redoStack: T[] = [];

  public constructor(initial: T) {
    this.current = initial;
  }

  public getState(): T {
    throw new Error('HistoryStack.getState is not implemented yet');
  }

  public push(_state: T): void {
    throw new Error('HistoryStack.push is not implemented yet');
  }

  public undo(): T {
    throw new Error('HistoryStack.undo is not implemented yet');
  }

  public redo(): T {
    throw new Error('HistoryStack.redo is not implemented yet');
  }

  public canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  public canRedo(): boolean {
    return this.redoStack.length > 0;
  }
}
