import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Собрать factory presets для тестовых пользователей через безопасное копирование.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Prototype, clone и создание состояния без мутаций");
    expect(exerciseContract.exercise).toBe("Собрать factory presets для тестовых пользователей через безопасное копирование.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["creation function","selection rule","stable caller API"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Prototype, clone и создание состояния без мутаций",
      exercise: "Собрать factory presets для тестовых пользователей через безопасное копирование.",
      pattern: "factory",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["creation function","selection rule","stable caller API"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("factory");
  });
});
