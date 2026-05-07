import { expectTypeOf } from 'vitest';
import { createLessonUser, createUserId, type LessonUser, type UserId } from '../../src/index';

describe('type baseline', () => {
  it('preserves branded ids', () => {
    expectTypeOf(createUserId('user:max')).toEqualTypeOf<UserId>();
  });

  it('infers lesson user shape', () => {
    expectTypeOf(createLessonUser('Max')).toEqualTypeOf<LessonUser>();
  });
});
