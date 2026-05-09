// Command pattern — действие как объект.
// Каждый Command знает как себя выполнить (execute) и как откатить (undo).
// CommandStack хранит выполненные команды и реализует undo/redo.

export interface Command {
  execute(): void;
  undo(): void;
}

// TODO: реализовать CommandStack.
// - run(cmd): выполнить cmd.execute(), положить в undoStack, очистить redoStack
// - undo(): вытащить из undoStack, позвать .undo(), положить в redoStack
// - redo(): вытащить из redoStack, позвать .execute(), положить в undoStack
// - canUndo / canRedo — есть ли что откатывать/повторять
export class CommandStack {
  protected undoStack: Command[] = [];
  protected redoStack: Command[] = [];

  public run(_cmd: Command): void {
    throw new Error('CommandStack.run is not implemented yet');
  }

  public undo(): void {
    throw new Error('CommandStack.undo is not implemented yet');
  }

  public redo(): void {
    throw new Error('CommandStack.redo is not implemented yet');
  }

  public canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  public canRedo(): boolean {
    return this.redoStack.length > 0;
  }
}

// Конкретные команды для счётчика и текстового поля.

export class Counter {
  private value = 0;
  public get(): number {
    return this.value;
  }
  public set(value: number): void {
    this.value = value;
  }
  public increment(): void {
    this.value++;
  }
  public decrement(): void {
    this.value--;
  }
}

export class IncrementCommand implements Command {
  public constructor(private readonly counter: Counter) {}
  public execute(): void {
    this.counter.increment();
  }
  public undo(): void {
    this.counter.decrement();
  }
}

export class DecrementCommand implements Command {
  public constructor(private readonly counter: Counter) {}
  public execute(): void {
    this.counter.decrement();
  }
  public undo(): void {
    this.counter.increment();
  }
}

export class TextField {
  private value = '';
  public get(): string {
    return this.value;
  }
  public set(value: string): void {
    this.value = value;
  }
}

export class SetTextCommand implements Command {
  private previousValue = '';
  public constructor(private readonly field: TextField, private readonly nextValue: string) {}
  public execute(): void {
    this.previousValue = this.field.get();
    this.field.set(this.nextValue);
  }
  public undo(): void {
    this.field.set(this.previousValue);
  }
}
