import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Собрать command queue для отложенной отправки progress-событий.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Queue, debounce и throttle в пользовательских сценариях");
    expect(exerciseContract.exercise).toBe("Собрать command queue для отложенной отправки progress-событий.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["command object","execute method","undo/history path"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Queue, debounce и throttle в пользовательских сценариях",
      exercise: "Собрать command queue для отложенной отправки progress-событий.",
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
