import type { Task, TaskStatus, TaskType, Priority } from '../models/task.js';
import { Board } from '../commands/board.js';
import { CommandStack } from '../commands/command-stack.js';
import {
  AddTaskCommand,
  RemoveTaskCommand,
  MoveTaskCommand,
  RenameTaskCommand,
} from '../commands/commands.js';
import { EventBus } from '../observer/event-bus.js';
import { assertTransition } from '../state/task-state.js';
import { createBug, createFeature, createChore } from '../factory/task-factory.js';
import type { SortStrategy } from '../strategy/sort-strategies.js';
import { sortTasks } from '../strategy/sort-strategies.js';

export interface AddTaskInput {
  type: TaskType;
  title: string;
  priority?: Priority;
  assignee?: string | null;
}

export class TaskTracker {
  public readonly events = new EventBus();
  private readonly board = new Board();
  private readonly stack = new CommandStack();

  public addTask(input: AddTaskInput): Task {
    const task = this.createTask(input);
    this.stack.do(new AddTaskCommand(this.board, task));
    this.events.emit({ type: 'task:added', task });
    return task;
  }

  public removeTask(id: string): void {
    const task = this.board.get(id);
    if (!task) return;
    this.stack.do(new RemoveTaskCommand(this.board, id));
    this.events.emit({ type: 'task:removed', taskId: id });
  }

  public moveTask(id: string, to: TaskStatus): void {
    const task = this.board.get(id);
    if (!task) return;
    assertTransition(task.status, to);
    if (task.status === to) return;
    const from = task.status;
    this.stack.do(new MoveTaskCommand(this.board, id, to));
    const moved = this.board.get(id);
    if (moved) {
      this.events.emit({ type: 'task:moved', task: moved, from, to });
    }
  }

  public renameTask(id: string, title: string): void {
    const task = this.board.get(id);
    if (!task) return;
    const previous = task;
    this.stack.do(new RenameTaskCommand(this.board, id, title));
    const updated = this.board.get(id);
    if (updated) {
      this.events.emit({ type: 'task:updated', task: updated, previous });
    }
  }

  public list(strategy?: SortStrategy): Task[] {
    return strategy ? sortTasks(this.board.list(), strategy) : this.board.list();
  }

  public undo(): void {
    this.stack.undo();
  }

  public redo(): void {
    this.stack.redo();
  }

  public canUndo(): boolean {
    return this.stack.canUndo();
  }

  public canRedo(): boolean {
    return this.stack.canRedo();
  }

  public get(id: string): Task | undefined {
    return this.board.get(id);
  }

  protected createTask(input: AddTaskInput): Task {
    switch (input.type) {
      case 'bug':
        return createBug(input);
      case 'feature':
        return createFeature(input);
      case 'chore':
        return createChore(input);
    }
  }

  public _boardRef(): Board {
    return this.board;
  }

  public _stackRef(): CommandStack {
    return this.stack;
  }
}

export { AddTaskCommand, RemoveTaskCommand, MoveTaskCommand, RenameTaskCommand };
