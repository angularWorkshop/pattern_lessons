import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Собрать interpreter для фильтра курса: tag = \"patterns\" AND level != \"advanced\".", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Interpreter: маленький язык правил без тяжёлого парсера");
    expect(exerciseContract.exercise).toBe("Собрать interpreter для фильтра курса: tag = \"patterns\" AND level != \"advanced\".");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["expression node","evaluation context","safe rule result"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Interpreter: маленький язык правил без тяжёлого парсера",
      exercise: "Собрать interpreter для фильтра курса: tag = \"patterns\" AND level != \"advanced\".",
      pattern: "interpreter",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["expression node","evaluation context","safe rule result"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("interpreter");
  });
});
