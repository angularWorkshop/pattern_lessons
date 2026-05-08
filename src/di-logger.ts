import type { LogEntry, LogLevel, Logger } from './logger.js';

// DI-вариант: обычный класс без singleton-обвязки. «Один экземпляр»
// обеспечивается на уровне сборки приложения (DI-контейнер регистрирует
// провайдер с singleton-scope). Тестирование тривиально — у каждого теста
// свой инстанс, никаких глобальных reset'ов.
export class DiLogger implements Logger {
  private readonly entries: LogEntry[] = [];

  // TODO: log() должен пушить { level, message, timestamp: Date.now() }
  public log(_level: LogLevel, _message: string): void {
    throw new Error('DiLogger.log is not implemented yet');
  }

  public getEntries(): readonly LogEntry[] {
    return this.entries;
  }
}
