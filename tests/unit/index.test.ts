import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Подключить async flow: retry, cancellation, optimistic update и undo.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Проект: Learning Dashboard Flow");
    expect(exerciseContract.exercise).toBe("Подключить async flow: retry, cancellation, optimistic update и undo.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["retry policy","backoff delay","idempotency guard"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Проект: Learning Dashboard Flow",
      exercise: "Подключить async flow: retry, cancellation, optimistic update и undo.",
      pattern: "retry",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["retry policy","backoff delay","idempotency guard"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("retry");
  });
});
