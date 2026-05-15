import type { Task, TaskStatus } from '../models/task.js';
import type { Board } from './board.js';
import type { Command } from './command.js';

export class AddTaskCommand implements Command {
  public readonly label = 'add';
  public constructor(
    private readonly board: Board,
    private readonly task: Task,
  ) {}

  public execute(): void {
    this.board.set(this.task);
  }

  public undo(): void {
    this.board.remove(this.task.id);
  }
}

export class RemoveTaskCommand implements Command {
  public readonly label = 'remove';
  private snapshot: Task | undefined;
  public constructor(
    private readonly board: Board,
    private readonly taskId: string,
  ) {}

  public execute(): void {
    this.snapshot = this.board.get(this.taskId);
    this.board.remove(this.taskId);
  }

  public undo(): void {
    if (this.snapshot) {
      this.board.set(this.snapshot);
    }
  }
}

export class UpdateTaskCommand implements Command {
  public readonly label = 'update';
  private previous: Task | undefined;
  public constructor(
    private readonly board: Board,
    private readonly taskId: string,
    private readonly patch: Partial<Omit<Task, 'id'>>,
  ) {}

  public execute(): void {
    const current = this.board.get(this.taskId);
    if (!current) return;
    this.previous = current;
    this.board.set({ ...current, ...this.patch });
  }

  public undo(): void {
    if (this.previous) {
      this.board.set(this.previous);
    }
  }
}

export class MoveTaskCommand implements Command {
  public readonly label = 'move';
  private previousStatus: TaskStatus | undefined;
  public constructor(
    private readonly board: Board,
    private readonly taskId: string,
    private readonly to: TaskStatus,
  ) {}

  public execute(): void {
    const current = this.board.get(this.taskId);
    if (!current) return;
    this.previousStatus = current.status;
    this.board.set({ ...current, status: this.to });
  }

  public undo(): void {
    const current = this.board.get(this.taskId);
    if (!current || this.previousStatus === undefined) return;
    this.board.set({ ...current, status: this.previousStatus });
  }
}

export class RenameTaskCommand implements Command {
  public readonly label = 'rename';
  private previousTitle: string | undefined;
  public constructor(
    private readonly board: Board,
    private readonly taskId: string,
    private readonly newTitle: string,
  ) {}

  public execute(): void {
    const current = this.board.get(this.taskId);
    if (!current) return;
    this.previousTitle = current.title;
    this.board.set({ ...current, title: this.newTitle });
  }

  public undo(): void {
    const current = this.board.get(this.taskId);
    if (!current || this.previousTitle === undefined) return;
    this.board.set({ ...current, title: this.previousTitle });
  }
}
