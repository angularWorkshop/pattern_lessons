// Очередь команд с приоритетами и возможностью отмены до выполнения.

export interface QueueCommand {
  execute(): void;
}

export type CommandId = number;

interface ScheduledItem {
  id: CommandId;
  priority: number;
  command: QueueCommand;
  cancelled: boolean;
}

// TODO: реализовать CommandQueue.
// - schedule(cmd, priority) → возвращает CommandId. Записывает в items
// - cancel(id) → ставит флаг cancelled на запись с этим id
// - runAll() → исполняет команды по убыванию приоритета;
//   при равных приоритетах сохраняется порядок добавления (стабильная сортировка).
//   Cancelled-записи пропускаются. Возвращает массив id выполненных в порядке выполнения.
export class CommandQueue {
  private readonly items: ScheduledItem[] = [];
  private nextId: CommandId = 1;

  public schedule(_command: QueueCommand, _priority: number): CommandId {
    throw new Error('CommandQueue.schedule is not implemented yet');
  }

  public cancel(_id: CommandId): void {
    throw new Error('CommandQueue.cancel is not implemented yet');
  }

  public runAll(): readonly CommandId[] {
    throw new Error('CommandQueue.runAll is not implemented yet');
  }
}
