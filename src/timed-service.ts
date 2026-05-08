import { measure, type MeasureReport } from './measure-decorator.js';

// Тестовый класс. Reporter передаётся в фабрику декоратора, тесты читают
// массив reports, чтобы убедиться, что время записано.
export const reports: MeasureReport[] = [];
const reporter = (r: MeasureReport): void => {
  reports.push(r);
};

export class TimedService {
  @measure(reporter)
  public syncTask(n: number): number {
    let total = 0;
    for (let i = 0; i < n; i++) {
      total += i;
    }
    return total;
  }

  @measure(reporter)
  public async asyncTask(ms: number): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, ms));
    return `done in ${ms}ms`;
  }

  @measure(reporter)
  public failingTask(): never {
    throw new Error('boom');
  }

  @measure(reporter)
  public async failingAsync(): Promise<never> {
    throw new Error('async boom');
  }
}
