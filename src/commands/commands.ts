import type { Task, TaskStatus } from '../models/task.js';
import type { Board } from './board.js';
import type { Command } from './command.js';

// TODO: реализуй 5 команд. Каждая хранит обратные данные для undo.
//   AddTaskCommand: execute сохраняет, undo удаляет.
//   RemoveTaskCommand: execute удаляет, undo возвращает (запомни snapshot до удаления).
//   UpdateTaskCommand: execute заменяет на newTask, undo возвращает previous.
//   MoveTaskCommand: execute меняет status, undo возвращает прошлый status.
//   RenameTaskCommand: execute меняет title, undo возвращает прошлый title.
// label — короткая строка для history(): 'add', 'remove', 'update', 'move', 'rename'.
//
// Важно:
//   - команды должны быть переисполняемыми (do → undo → redo вернёт исходное)
//   - используй board.set/remove/get — Board не должен знать про команды

export class AddTaskCommand implements Command {
  public readonly label = 'add';
  public constructor(
    private readonly _board: Board,
    private readonly _task: Task,
  ) {}

  public execute(): void {
    throw new Error('Not implemented');
  }

  public undo(): void {
    throw new Error('Not implemented');
  }
}

export class RemoveTaskCommand implements Command {
  public readonly label = 'remove';
  public constructor(
    private readonly _board: Board,
    private readonly _taskId: string,
  ) {}

  public execute(): void {
    throw new Error('Not implemented');
  }

  public undo(): void {
    throw new Error('Not implemented');
  }
}

export class UpdateTaskCommand implements Command {
  public readonly label = 'update';
  public constructor(
    private readonly _board: Board,
    private readonly _taskId: string,
    private readonly _patch: Partial<Omit<Task, 'id'>>,
  ) {}

  public execute(): void {
    throw new Error('Not implemented');
  }

  public undo(): void {
    throw new Error('Not implemented');
  }
}

export class MoveTaskCommand implements Command {
  public readonly label = 'move';
  public constructor(
    private readonly _board: Board,
    private readonly _taskId: string,
    private readonly _to: TaskStatus,
  ) {}

  public execute(): void {
    throw new Error('Not implemented');
  }

  public undo(): void {
    throw new Error('Not implemented');
  }
}

export class RenameTaskCommand implements Command {
  public readonly label = 'rename';
  public constructor(
    private readonly _board: Board,
    private readonly _taskId: string,
    private readonly _newTitle: string,
  ) {}

  public execute(): void {
    throw new Error('Not implemented');
  }

  public undo(): void {
    throw new Error('Not implemented');
  }
}
