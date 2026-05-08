export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: number;
}

export interface Logger {
  log(level: LogLevel, message: string): void;
  getEntries(): readonly LogEntry[];
}
