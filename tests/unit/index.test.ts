import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Убрать прямые зависимости между модулями формы через workflow mediator.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Mediator: координация без паутины зависимостей");
    expect(exerciseContract.exercise).toBe("Убрать прямые зависимости между модулями формы через workflow mediator.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["central mediator","module coordination","no direct dependency"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Mediator: координация без паутины зависимостей",
      exercise: "Убрать прямые зависимости между модулями формы через workflow mediator.",
      pattern: "mediator",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["central mediator","module coordination","no direct dependency"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("mediator");
  });
});
