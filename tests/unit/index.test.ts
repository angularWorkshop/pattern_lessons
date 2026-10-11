import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Сделать headless pagination controller и две разные UI-обёртки.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Composition patterns: slots, render props и headless logic");
    expect(exerciseContract.exercise).toBe("Сделать headless pagination controller и две разные UI-обёртки.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["headless logic","render boundary","two UI variants"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Composition patterns: slots, render props и headless logic",
      exercise: "Сделать headless pagination controller и две разные UI-обёртки.",
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
