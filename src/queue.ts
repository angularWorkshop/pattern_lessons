export interface QueueCommand {
  execute(): void;
}

export type CommandId = number;

interface ScheduledItem {
  id: CommandId;
  priority: number;
  command: QueueCommand;
  cancelled: boolean;
  insertedAt: number;
}

export class CommandQueue {
  private readonly items: ScheduledItem[] = [];
  private nextId: CommandId = 1;
  private nextInsertion = 0;

  public schedule(command: QueueCommand, priority: number): CommandId {
    const id = this.nextId++;
    this.items.push({
      id,
      priority,
      command,
      cancelled: false,
      insertedAt: this.nextInsertion++,
    });
    return id;
  }

  public cancel(id: CommandId): void {
    const item = this.items.find((it) => it.id === id);
    if (item) {
      item.cancelled = true;
    }
  }

  public runAll(): readonly CommandId[] {
    const ordered = [...this.items].sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      return a.insertedAt - b.insertedAt;
    });
    const executed: CommandId[] = [];
    for (const item of ordered) {
      if (item.cancelled) continue;
      item.command.execute();
      executed.push(item.id);
    }
    return executed;
  }
}
