import type { LogEntry, LogLevel, Logger } from './logger.js';

// Модульный singleton через closure. JS-модули исполняются один раз,
// поэтому экспортированный объект автоматически singleton.
function createModuleLogger(): Logger & { reset(): void } {
  // TODO: завести локальный массив entries в closure.
  // Вернуть объект с методами log / getEntries / reset (для тестов).
  return {
    log(_level: LogLevel, _message: string): void {
      throw new Error('moduleLogger.log is not implemented yet');
    },
    getEntries(): readonly LogEntry[] {
      throw new Error('moduleLogger.getEntries is not implemented yet');
    },
    reset(): void {
      throw new Error('moduleLogger.reset is not implemented yet');
    },
  };
}

export const moduleLogger = createModuleLogger();
