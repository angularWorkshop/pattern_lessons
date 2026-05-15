import { assertTransition, IllegalTransitionError } from '../../src/state/task-state.js';

describe('State pattern — task status transitions', () => {
  it('allows todo -> in_progress', () => {
    expect(() => assertTransition('todo', 'in_progress')).not.toThrow();
  });

  it('allows in_progress -> done', () => {
    expect(() => assertTransition('in_progress', 'done')).not.toThrow();
  });

  it('allows in_progress -> todo (revert)', () => {
    expect(() => assertTransition('in_progress', 'todo')).not.toThrow();
  });

  it('allows done -> in_progress (reopen)', () => {
    expect(() => assertTransition('done', 'in_progress')).not.toThrow();
  });

  it('forbids todo -> done', () => {
    expect(() => assertTransition('todo', 'done')).toThrow(IllegalTransitionError);
  });

  it('forbids done -> todo', () => {
    expect(() => assertTransition('done', 'todo')).toThrow(IllegalTransitionError);
  });

  it('is idempotent on same status', () => {
    expect(() => assertTransition('todo', 'todo')).not.toThrow();
    expect(() => assertTransition('done', 'done')).not.toThrow();
  });

  it('error carries from/to info', () => {
    try {
      assertTransition('todo', 'done');
      expect.fail('should have thrown');
    } catch (e) {
      expect(e).toBeInstanceOf(IllegalTransitionError);
      expect((e as IllegalTransitionError).from).toBe('todo');
      expect((e as IllegalTransitionError).to).toBe('done');
    }
  });
});
