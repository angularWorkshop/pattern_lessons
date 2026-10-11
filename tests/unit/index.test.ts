import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Нормализовать список sections/topics/exercises в entity store.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Selectors и normalized state");
    expect(exerciseContract.exercise).toBe("Нормализовать список sections/topics/exercises в entity store.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["normalized state","derived selector","progress projection"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Selectors и normalized state",
      exercise: "Нормализовать список sections/topics/exercises в entity store.",
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
