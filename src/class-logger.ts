import type { LogEntry, LogLevel, Logger } from './logger.js';

// Классический singleton: приватный конструктор + статическое поле instance.
// Минусы: глобальное состояние, тестирование требует reset, hidden dependencies.
export class ClassLogger implements Logger {
  private static instance: ClassLogger | null = null;
  private readonly entries: LogEntry[] = [];

  // TODO: сделать конструктор приватным (только внутри getInstance можно создавать).
  private constructor() {}

  // TODO: getInstance() — создать инстанс если null, иначе вернуть существующий.
  public static getInstance(): ClassLogger {
    throw new Error('ClassLogger.getInstance is not implemented yet');
  }

  // TODO: для тестов — reset(), сбрасывает instance в null.
  public static reset(): void {
    throw new Error('ClassLogger.reset is not implemented yet');
  }

  public log(_level: LogLevel, _message: string): void {
    throw new Error('ClassLogger.log is not implemented yet');
  }

  public getEntries(): readonly LogEntry[] {
    return this.entries;
  }
}
