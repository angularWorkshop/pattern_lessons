import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Упростить переусложнённый модуль, удалив лишний паттерн без потери тестового покрытия.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Как выбрать паттерн и не уйти в overengineering");
    expect(exerciseContract.exercise).toBe("Упростить переусложнённый модуль, удалив лишний паттерн без потери тестового покрытия.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["problem statement","trade-off note","simpler alternative"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Как выбрать паттерн и не уйти в overengineering",
      exercise: "Упростить переусложнённый модуль, удалив лишний паттерн без потери тестового покрытия.",
      pattern: "decision",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["problem statement","trade-off note","simpler alternative"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("decision");
  });
});
