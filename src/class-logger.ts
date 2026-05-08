import type { LogEntry, LogLevel, Logger } from './logger.js';

export class ClassLogger implements Logger {
  private static instance: ClassLogger | null = null;
  private readonly entries: LogEntry[] = [];

  private constructor() {}

  public static getInstance(): ClassLogger {
    if (!ClassLogger.instance) {
      ClassLogger.instance = new ClassLogger();
    }
    return ClassLogger.instance;
  }

  public static reset(): void {
    ClassLogger.instance = null;
  }

  public log(level: LogLevel, message: string): void {
    this.entries.push({ level, message, timestamp: Date.now() });
  }

  public getEntries(): readonly LogEntry[] {
    return this.entries;
  }
}
