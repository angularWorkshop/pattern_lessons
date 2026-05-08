import type { LogEntry, LogLevel, Logger } from './logger.js';

function createModuleLogger(): Logger & { reset(): void } {
  let entries: LogEntry[] = [];
  return {
    log(level: LogLevel, message: string): void {
      entries.push({ level, message, timestamp: Date.now() });
    },
    getEntries(): readonly LogEntry[] {
      return entries;
    },
    reset(): void {
      entries = [];
    },
  };
}

export const moduleLogger = createModuleLogger();
