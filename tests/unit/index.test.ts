import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Собрать state machine для проверки задания с разрешёнными переходами.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("State: поведение зависит от состояния объекта");
    expect(exerciseContract.exercise).toBe("Собрать state machine для проверки задания с разрешёнными переходами.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["finite statuses","allowed transition","illegal action guard"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "State: поведение зависит от состояния объекта",
      exercise: "Собрать state machine для проверки задания с разрешёнными переходами.",
      pattern: "state",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["finite statuses","allowed transition","illegal action guard"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("state");
  });
});
