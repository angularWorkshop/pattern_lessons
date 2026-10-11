import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Вынести CourseRepository port и REST adapter.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Ports & Adapters: отделить приложение от внешнего мира");
    expect(exerciseContract.exercise).toBe("Вынести CourseRepository port и REST adapter.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["target interface","wrapped dependency","mapped data shape"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Ports & Adapters: отделить приложение от внешнего мира",
      exercise: "Вынести CourseRepository port и REST adapter.",
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
