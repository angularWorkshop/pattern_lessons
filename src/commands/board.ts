import type { Task, TaskStatus } from '../models/task.js';

// Доска — простой контейнер задач + getter'ы. Команды модифицируют её через эти методы.
// Никакой бизнес-логики (валидация State, события Observer) — это в Facade.

export class Board {
  private readonly tasks = new Map<string, Task>();

  public list(): Task[] {
    return [...this.tasks.values()];
  }

  public listByStatus(status: TaskStatus): Task[] {
    return this.list().filter((task) => task.status === status);
  }

  public get(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  public set(task: Task): void {
    this.tasks.set(task.id, task);
  }

  public remove(id: string): void {
    this.tasks.delete(id);
  }

  public has(id: string): boolean {
    return this.tasks.has(id);
  }

  public size(): number {
    return this.tasks.size;
  }
}
