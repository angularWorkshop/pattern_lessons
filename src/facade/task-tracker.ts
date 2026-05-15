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

// Facade поверх всех паттернов. Публичный API:
//   - addTask({ type, title, priority?, assignee? })
//   - removeTask(id)
//   - moveTask(id, to)            <-- проверяет State-переход через assertTransition
//   - renameTask(id, title)
//   - undo() / redo()
//   - list(strategy?)             <-- Strategy сортировки
//   - events: EventBus            <-- Observer
//
// Главная инвариантность: каждое мутирующее действие проходит через CommandStack
// и эмитит соответствующее событие через events.

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

  public addTask(_input: AddTaskInput): Task {
    throw new Error('Not implemented');
  }

  public removeTask(_id: string): void {
    throw new Error('Not implemented');
  }

  public moveTask(_id: string, _to: TaskStatus): void {
    // ПОДСКАЗКА: проверь переход через assertTransition ДО выполнения команды.
    throw new Error('Not implemented');
  }

  public renameTask(_id: string, _title: string): void {
    throw new Error('Not implemented');
  }

  public list(strategy?: SortStrategy): Task[] {
    return strategy ? sortTasks(this.board.list(), strategy) : this.board.list();
  }

  public undo(): void {
    throw new Error('Not implemented');
  }

  public redo(): void {
    throw new Error('Not implemented');
  }

  public canUndo(): boolean {
    return this.stack.canUndo();
  }

  public canRedo(): boolean {
    return this.stack.canRedo();
  }

  // Вспомогалка — реально нужна, чтобы тесты могли инспектировать.
  public get(id: string): Task | undefined {
    return this.board.get(id);
  }

  // ВЫЗОВ фабрики по типу — отдельно, чтобы видно: тут Factory Method.
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

  // Делаем вспомогалки доступными подклассам/тестам:
  public _boardRef(): Board {
    return this.board;
  }

  public _stackRef(): CommandStack {
    return this.stack;
  }
}

export { AddTaskCommand, RemoveTaskCommand, MoveTaskCommand, RenameTaskCommand };
