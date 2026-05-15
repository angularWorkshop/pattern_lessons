import type { Command } from './command.js';

// TODO: реализуй стек команд:
//   - do(cmd) — вызывает cmd.execute(), кладёт в undo-стек, очищает redo-стек
//   - undo() — снимает последнюю команду, вызывает undo(), кладёт в redo-стек
//   - redo() — снимает последнюю из redo, вызывает execute(), кладёт в undo
//   - canUndo() / canRedo() — есть ли что
//   - clear() — обнуляет оба стека
//   - history() — readonly snapshot для дебага: { undone, pending }
//
// Гарантии:
//   - после new do() — redo всегда пустой (классическая семантика)
//   - undo на пустом стеке — no-op (без ошибок)
//   - redo на пустом — no-op

export class CommandStack {
  public do(_cmd: Command): void {
    throw new Error('Not implemented');
  }

  public undo(): void {
    throw new Error('Not implemented');
  }

  public redo(): void {
    throw new Error('Not implemented');
  }

  public canUndo(): boolean {
    throw new Error('Not implemented');
  }

  public canRedo(): boolean {
    throw new Error('Not implemented');
  }

  public clear(): void {
    throw new Error('Not implemented');
  }

  public history(): { undone: readonly string[]; pending: readonly string[] } {
    throw new Error('Not implemented');
  }
}
