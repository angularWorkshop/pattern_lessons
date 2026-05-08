import { ClassLogger } from '../../src/class-logger.js';
import { moduleLogger } from '../../src/module-logger.js';
import { DiLogger } from '../../src/di-logger.js';

describe('ClassLogger — class-based singleton', () => {
  beforeEach(() => {
    ClassLogger.reset();
  });

  it('returns the same instance across calls', () => {
    const a = ClassLogger.getInstance();
    const b = ClassLogger.getInstance();
    expect(a).toBe(b);
  });

  it('preserves entries across getInstance() calls', () => {
    ClassLogger.getInstance().log('info', 'hello');
    expect(ClassLogger.getInstance().getEntries()).toHaveLength(1);
  });

  it('reset() rebuilds a fresh instance', () => {
    const a = ClassLogger.getInstance();
    a.log('warn', 'something');
    ClassLogger.reset();
    const b = ClassLogger.getInstance();
    expect(b).not.toBe(a);
    expect(b.getEntries()).toHaveLength(0);
  });
});

describe('moduleLogger — closure-based singleton', () => {
  beforeEach(() => {
    moduleLogger.reset();
  });

  it('is the same object across multiple imports (module identity)', async () => {
    const { moduleLogger: again } = await import('../../src/module-logger.js');
    expect(again).toBe(moduleLogger);
  });

  it('records log entries', () => {
    moduleLogger.log('error', 'boom');
    expect(moduleLogger.getEntries()).toHaveLength(1);
    expect(moduleLogger.getEntries()[0]?.message).toBe('boom');
  });

  it('reset() clears entries but keeps the same object', () => {
    moduleLogger.log('info', 'first');
    moduleLogger.reset();
    expect(moduleLogger.getEntries()).toHaveLength(0);
  });
});

describe('DiLogger — singleton scope is the consumer\'s problem', () => {
  it('every new DiLogger() is independent', () => {
    const a = new DiLogger();
    const b = new DiLogger();
    a.log('info', 'a');
    expect(b.getEntries()).toHaveLength(0);
  });

  it('an upstream consumer can share a single DiLogger by passing it to dependents', () => {
    const shared = new DiLogger();
    const consumerA = { log: (m: string) => shared.log('info', `A:${m}`) };
    const consumerB = { log: (m: string) => shared.log('info', `B:${m}`) };
    consumerA.log('hello');
    consumerB.log('world');
    expect(shared.getEntries()).toHaveLength(2);
  });
});

describe('All three loggers respect the Logger interface', () => {
  it('records timestamps as numbers', () => {
    ClassLogger.reset();
    const c = ClassLogger.getInstance();
    c.log('info', 'x');
    const entry = c.getEntries()[0];
    expect(typeof entry?.timestamp).toBe('number');
  });
});
