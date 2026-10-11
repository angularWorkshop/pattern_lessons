import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Обернуть callback-based analytics SDK в Promise-friendly adapter.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Adapter: подружить несовместимые формы данных");
    expect(exerciseContract.exercise).toBe("Обернуть callback-based analytics SDK в Promise-friendly adapter.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["target interface","wrapped dependency","mapped data shape"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Adapter: подружить несовместимые формы данных",
      exercise: "Обернуть callback-based analytics SDK в Promise-friendly adapter.",
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
