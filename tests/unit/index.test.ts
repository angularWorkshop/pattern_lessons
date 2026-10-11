import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Добавить новую scoring strategy для проверки курса без изменения старых стратегий.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Strategy: заменить ветвление набором правил");
    expect(exerciseContract.exercise).toBe("Добавить новую scoring strategy для проверки курса без изменения старых стратегий.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["strategy interface","strategy map","open extension"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Strategy: заменить ветвление набором правил",
      exercise: "Добавить новую scoring strategy для проверки курса без изменения старых стратегий.",
      pattern: "strategy",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["strategy interface","strategy map","open extension"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("strategy");
  });
});
