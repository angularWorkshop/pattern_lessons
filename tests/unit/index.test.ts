import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Добавить idempotency key в command отправки результата упражнения.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Retry, backoff и idempotency");
    expect(exerciseContract.exercise).toBe("Добавить idempotency key в command отправки результата упражнения.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["command object","execute method","undo/history path"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Retry, backoff и idempotency",
      exercise: "Добавить idempotency key в command отправки результата упражнения.",
      pattern: "command",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["command object","execute method","undo/history path"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("command");
  });
});
