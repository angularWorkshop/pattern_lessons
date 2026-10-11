import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Сохранить command history и восстановить состояние после перезапуска теста.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Command: действие как объект");
    expect(exerciseContract.exercise).toBe("Сохранить command history и восстановить состояние после перезапуска теста.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["command object","execute method","undo/history path"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Command: действие как объект",
      exercise: "Сохранить command history и восстановить состояние после перезапуска теста.",
      pattern: "command",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["command object","execute method","undo/history path"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("command");
  });
});
