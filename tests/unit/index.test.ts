import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Исправить баг shared state, где два виджета случайно меняют один вложенный объект.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Prototype, clone и создание состояния без мутаций");
    expect(exerciseContract.exercise).toBe("Исправить баг shared state, где два виджета случайно меняют один вложенный объект.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["safe clone","independent copy","mutation guard"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Prototype, clone и создание состояния без мутаций",
      exercise: "Исправить баг shared state, где два виджета случайно меняют один вложенный объект.",
      pattern: "prototype",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["safe clone","independent copy","mutation guard"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("prototype");
  });
});
