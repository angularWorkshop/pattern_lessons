import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Написать selectors для прогресса курса и active exercise.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Selectors и normalized state");
    expect(exerciseContract.exercise).toBe("Написать selectors для прогресса курса и active exercise.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["normalized state","derived selector","progress projection"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Selectors и normalized state",
      exercise: "Написать selectors для прогресса курса и active exercise.",
      pattern: "selector",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["normalized state","derived selector","progress projection"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("selector");
  });
});
