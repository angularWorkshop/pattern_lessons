import type { LogEntry, LogLevel, Logger } from './logger.js';

export class DiLogger implements Logger {
  private readonly entries: LogEntry[] = [];

  public log(level: LogLevel, message: string): void {
    this.entries.push({ level, message, timestamp: Date.now() });
  }

  public getEntries(): readonly LogEntry[] {
    return this.entries;
  }
}
