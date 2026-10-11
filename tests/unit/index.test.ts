import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Реализовать iterator для дерева sections/topics/exercises.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Iterator: обход коллекции без знания её внутренностей");
    expect(exerciseContract.exercise).toBe("Реализовать iterator для дерева sections/topics/exercises.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["iterator protocol","next result","hidden collection shape"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Iterator: обход коллекции без знания её внутренностей",
      exercise: "Реализовать iterator для дерева sections/topics/exercises.",
      pattern: "iterator",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["iterator protocol","next result","hidden collection shape"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("iterator");
  });
});
