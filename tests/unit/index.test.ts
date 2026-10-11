import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Реализовать debounce search с отменой устаревших запросов.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Queue, debounce и throttle в пользовательских сценариях");
    expect(exerciseContract.exercise).toBe("Реализовать debounce search с отменой устаревших запросов.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["queued command","flush rule","debounced action"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Queue, debounce и throttle в пользовательских сценариях",
      exercise: "Реализовать debounce search с отменой устаревших запросов.",
      pattern: "queue",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["queued command","flush rule","debounced action"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("queue");
  });
});
