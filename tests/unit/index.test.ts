import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Преобразовать Course domain model в CourseCardViewModel.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("MVC, MVP, MVVM и ViewModel без исторической каши");
    expect(exerciseContract.exercise).toBe("Преобразовать Course domain model в CourseCardViewModel.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["domain model","view model","presentation rule"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "MVC, MVP, MVVM и ViewModel без исторической каши",
      exercise: "Преобразовать Course domain model в CourseCardViewModel.",
      pattern: "viewmodel",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["domain model","view model","presentation rule"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("viewmodel");
  });
});
