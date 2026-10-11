import { expectTypeOf } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, type PatternExerciseResult } from '../../src/index';

describe('Design Patterns exercise types', () => {
  it('keeps both functions typed as the same result contract', () => {
    expectTypeOf(createPatternExercisePlan()).toEqualTypeOf<PatternExerciseResult>();
    expectTypeOf(completePatternExercise()).toEqualTypeOf<PatternExerciseResult>();
  });
});
