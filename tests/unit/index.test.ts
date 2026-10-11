import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Создать contract tests для fake и REST adapter.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Test Doubles, contract tests и fake infrastructure");
    expect(exerciseContract.exercise).toBe("Создать contract tests для fake и REST adapter.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["target interface","wrapped dependency","mapped data shape"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Test Doubles, contract tests и fake infrastructure",
      exercise: "Создать contract tests для fake и REST adapter.",
      pattern: "adapter",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["target interface","wrapped dependency","mapped data shape"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("adapter");
  });
});
