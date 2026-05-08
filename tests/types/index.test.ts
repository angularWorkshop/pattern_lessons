import { expectTypeOf } from 'vitest';
import { ClassLogger } from '../../src/class-logger.js';
import { moduleLogger } from '../../src/module-logger.js';
import { DiLogger } from '../../src/di-logger.js';
import type { Logger } from '../../src/logger.js';

describe('Logger interface — three different singleton flavors', () => {
  it('ClassLogger is a Logger', () => {
    expectTypeOf<ClassLogger>().toMatchTypeOf<Logger>();
  });
  it('moduleLogger is a Logger', () => {
    expectTypeOf(moduleLogger).toMatchTypeOf<Logger>();
  });
  it('DiLogger is a Logger', () => {
    expectTypeOf<DiLogger>().toMatchTypeOf<Logger>();
  });
});
