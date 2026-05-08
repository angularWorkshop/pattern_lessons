import { TimedService, reports } from '../../src/timed-service.js';

describe('@measure decorator', () => {
  beforeEach(() => {
    reports.length = 0;
  });

  it('reports a sync method after it returns', () => {
    const s = new TimedService();
    const result = s.syncTask(1000);
    expect(typeof result).toBe('number');
    expect(reports).toHaveLength(1);
    expect(reports[0]).toMatchObject({ method: 'syncTask', ok: true });
    expect(reports[0]?.durationMs).toBeGreaterThanOrEqual(0);
  });

  it('reports an async method after the Promise resolves', async () => {
    const s = new TimedService();
    const result = await s.asyncTask(15);
    expect(result).toBe('done in 15ms');
    expect(reports).toHaveLength(1);
    expect(reports[0]?.method).toBe('asyncTask');
    expect(reports[0]?.ok).toBe(true);
    expect(reports[0]?.durationMs).toBeGreaterThanOrEqual(15);
  });

  it('reports a failing sync method as ok: false and rethrows', () => {
    const s = new TimedService();
    expect(() => s.failingTask()).toThrow('boom');
    expect(reports).toHaveLength(1);
    expect(reports[0]).toMatchObject({ method: 'failingTask', ok: false });
  });

  it('reports a failing async method as ok: false and rejects', async () => {
    const s = new TimedService();
    await expect(s.failingAsync()).rejects.toThrow('async boom');
    expect(reports).toHaveLength(1);
    expect(reports[0]).toMatchObject({ method: 'failingAsync', ok: false });
  });

  it('does not change return values of methods', () => {
    const s = new TimedService();
    expect(s.syncTask(0)).toBe(0);
    expect(s.syncTask(5)).toBe(0 + 1 + 2 + 3 + 4);
  });

  it('tracks each call separately', () => {
    const s = new TimedService();
    s.syncTask(10);
    s.syncTask(20);
    expect(reports).toHaveLength(2);
  });
});
