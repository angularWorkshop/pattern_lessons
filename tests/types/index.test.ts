import { expectTypeOf } from 'vitest';
import { TimedService } from '../../src/timed-service.js';

describe('@measure preserves method signatures', () => {
  it('syncTask still returns number', () => {
    expectTypeOf(TimedService.prototype.syncTask).returns.toEqualTypeOf<number>();
  });
  it('asyncTask still returns Promise<string>', () => {
    expectTypeOf(TimedService.prototype.asyncTask).returns.toEqualTypeOf<Promise<string>>();
  });
});
