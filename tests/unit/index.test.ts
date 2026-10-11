import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Реализовать import pipeline через Template Method.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Template Method: общий алгоритм с изменяемыми шагами");
    expect(exerciseContract.exercise).toBe("Реализовать import pipeline через Template Method.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["algorithm skeleton","custom step","invariant order"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Template Method: общий алгоритм с изменяемыми шагами",
      exercise: "Реализовать import pipeline через Template Method.",
      pattern: "template method",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["algorithm skeleton","custom step","invariant order"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("template method");
  });
});
