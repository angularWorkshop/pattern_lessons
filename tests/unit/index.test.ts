import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Собрать маленький composition root, где создаются реальные зависимости приложения.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Dependency Inversion: зависеть от роли, а не от детали");
    expect(exerciseContract.exercise).toBe("Собрать маленький composition root, где создаются реальные зависимости приложения.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["headless logic","render boundary","two UI variants"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Dependency Inversion: зависеть от роли, а не от детали",
      exercise: "Собрать маленький composition root, где создаются реальные зависимости приложения.",
      pattern: "composition",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["headless logic","render boundary","two UI variants"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("composition");
  });
});
