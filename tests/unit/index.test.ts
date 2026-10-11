import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Сделать factory для course-card, которая нормализует backend DTO в UI model.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Factory Function и Factory Method");
    expect(exerciseContract.exercise).toBe("Сделать factory для course-card, которая нормализует backend DTO в UI model.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["creation function","selection rule","stable caller API"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Factory Function и Factory Method",
      exercise: "Сделать factory для course-card, которая нормализует backend DTO в UI model.",
      pattern: "factory",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["creation function","selection rule","stable caller API"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("factory");
  });
});
