import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Добавить timeout и cancellation в HTTP client wrapper.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Timeout, cancellation и Circuit Breaker");
    expect(exerciseContract.exercise).toBe("Добавить timeout и cancellation в HTTP client wrapper.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["timeout boundary","cancellation path","circuit state"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Timeout, cancellation и Circuit Breaker",
      exercise: "Добавить timeout и cancellation в HTTP client wrapper.",
      pattern: "resilience",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["timeout boundary","cancellation path","circuit state"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("resilience");
  });
});
