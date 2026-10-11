import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Собрать composite для вложенного navigation menu.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Composite: дерево элементов с единым API");
    expect(exerciseContract.exercise).toBe("Собрать composite для вложенного navigation menu.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["leaf node","composite node","recursive operation"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Composite: дерево элементов с единым API",
      exercise: "Собрать composite для вложенного navigation menu.",
      pattern: "composite",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["leaf node","composite node","recursive operation"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("composite");
  });
});
