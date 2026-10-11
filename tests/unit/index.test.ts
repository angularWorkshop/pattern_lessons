import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Написать `withLogging` и `withTiming` для async-функции.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Decorator: добавить поведение, не ломая основу");
    expect(exerciseContract.exercise).toBe("Написать `withLogging` и `withTiming` для async-функции.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["base behavior","wrapper function","preserved contract"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Decorator: добавить поведение, не ломая основу",
      exercise: "Написать `withLogging` и `withTiming` для async-функции.",
      pattern: "decorator",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["base behavior","wrapper function","preserved contract"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("decorator");
  });
});
