import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Разделить CoursePage на container и CourseListView.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Container / Presentational и Smart / Dumb components");
    expect(exerciseContract.exercise).toBe("Разделить CoursePage на container и CourseListView.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["container component","presentational component","testable props"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Container / Presentational и Smart / Dumb components",
      exercise: "Разделить CoursePage на container и CourseListView.",
      pattern: "container",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["container component","presentational component","testable props"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("container");
  });
});
