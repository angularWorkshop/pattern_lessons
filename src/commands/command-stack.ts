import type { Command } from './command.js';

export class CommandStack {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  public do(cmd: Command): void {
    cmd.execute();
    this.undoStack.push(cmd);
    this.redoStack = [];
  }

  public undo(): void {
    const cmd = this.undoStack.pop();
    if (!cmd) return;
    cmd.undo();
    this.redoStack.push(cmd);
  }

  public redo(): void {
    const cmd = this.redoStack.pop();
    if (!cmd) return;
    cmd.execute();
    this.undoStack.push(cmd);
  }

  public canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  public canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  public clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }

  public history(): { undone: readonly string[]; pending: readonly string[] } {
    return {
      undone: this.undoStack.map((c) => c.label),
      pending: this.redoStack.map((c) => c.label),
    };
  }
}
