import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Построить event log и восстановить state из списка событий.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("CQRS-lite и event log для frontend-фич");
    expect(exerciseContract.exercise).toBe("Построить event log и восстановить state из списка событий.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["command side","query side","event log"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "CQRS-lite и event log для frontend-фич",
      exercise: "Построить event log и восстановить state из списка событий.",
      pattern: "cqrs",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["command side","query side","event log"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("cqrs");
  });
});
