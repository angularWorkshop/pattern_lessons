import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Спрятать детали analytics и error tracking за facade одного feature-модуля.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Facade: простой вход к сложной подсистеме");
    expect(exerciseContract.exercise).toBe("Спрятать детали analytics и error tracking за facade одного feature-модуля.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["public facade API","hidden subsystem","orchestration method"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Facade: простой вход к сложной подсистеме",
      exercise: "Спрятать детали analytics и error tracking за facade одного feature-модуля.",
      pattern: "facade",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["public facade API","hidden subsystem","orchestration method"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("facade");
  });
});
