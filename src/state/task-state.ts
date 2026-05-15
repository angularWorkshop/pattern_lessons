import type { TaskStatus } from '../models/task.js';

// Легальные переходы:
//   todo -> in_progress
//   in_progress -> done
//   in_progress -> todo  (вернули в работу)
//   done -> in_progress  (переоткрыли)
// Любые другие переходы — бросают IllegalTransitionError.
// Переход в тот же статус — без ошибки (idempotent).

export class IllegalTransitionError extends Error {
  public constructor(
    public readonly from: TaskStatus,
    public readonly to: TaskStatus,
  ) {
    super(`Illegal transition: ${from} -> ${to}`);
    this.name = 'IllegalTransitionError';
  }
}

export function assertTransition(_from: TaskStatus, _to: TaskStatus): void {
  // TODO: проверить переход по таблице выше, на нелегальный — throw IllegalTransitionError.
  throw new Error('Not implemented');
}
