import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Написать in-memory repository и прогнать use-case tests без HTTP.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Test Doubles, contract tests и fake infrastructure");
    expect(exerciseContract.exercise).toBe("Написать in-memory repository и прогнать use-case tests без HTTP.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["test data builder","fake dependency","contract scenario"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Test Doubles, contract tests и fake infrastructure",
      exercise: "Написать in-memory repository и прогнать use-case tests без HTTP.",
      pattern: "testing",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["test data builder","fake dependency","contract scenario"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("testing");
  });
});
