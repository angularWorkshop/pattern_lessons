import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Собрать ThemeComponentsFactory для light/dark/high-contrast наборов UI-частей.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Abstract Factory: семейства связанных объектов");
    expect(exerciseContract.exercise).toBe("Собрать ThemeComponentsFactory для light/dark/high-contrast наборов UI-частей.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["creation function","selection rule","stable caller API"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Abstract Factory: семейства связанных объектов",
      exercise: "Собрать ThemeComponentsFactory для light/dark/high-contrast наборов UI-частей.",
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
