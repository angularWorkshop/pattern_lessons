import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Реализовать policy, которая решает, можно ли открыть финальный проект курса.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("DDD-lite: Entity, Value Object, Policy и Specification");
    expect(exerciseContract.exercise).toBe("Реализовать policy, которая решает, можно ли открыть финальный проект курса.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["value object","policy rule","specification check"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "DDD-lite: Entity, Value Object, Policy и Specification",
      exercise: "Реализовать policy, которая решает, можно ли открыть финальный проект курса.",
      pattern: "ddd",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["value object","policy rule","specification check"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("ddd");
  });
});
