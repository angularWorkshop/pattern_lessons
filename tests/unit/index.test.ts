import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Создать CourseBuilder для тестов progress-domain.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Test Data Builder и Object Mother");
    expect(exerciseContract.exercise).toBe("Создать CourseBuilder для тестов progress-domain.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["step builder","valid config","final build method"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Test Data Builder и Object Mother",
      exercise: "Создать CourseBuilder для тестов progress-domain.",
      pattern: "builder",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["step builder","valid config","final build method"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("builder");
  });
});
