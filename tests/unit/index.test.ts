import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Разобрать legacy-widget и построить слой adapter + factory.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Проект: Course Widget SDK");
    expect(exerciseContract.exercise).toBe("Разобрать legacy-widget и построить слой adapter + factory.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["creation function","selection rule","stable caller API"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Проект: Course Widget SDK",
      exercise: "Разобрать legacy-widget и построить слой adapter + factory.",
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
