export type ExerciseStatus = 'draft' | 'completed';

export interface PatternExerciseResult {
  readonly course: 'DESIGN_PATTERNS';
  readonly topic: string;
  readonly exercise: string;
  readonly pattern: string;
  readonly status: ExerciseStatus;
  readonly implementedArtifacts: readonly string[];
  readonly notes: string;
}

export const exerciseContract = {
  course: 'DESIGN_PATTERNS',
  topic: "Container / Presentational и Smart / Dumb components",
  exercise: "Разделить CoursePage на container и CourseListView.",
  requiredArtifacts: [
  "container component",
  "presentational component",
  "testable props"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "container",
    status: 'draft',
    implementedArtifacts: [],
    notes: 'План готов: осталось реализовать контракт упражнения.',
  };
}

export function completePatternExercise(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "container",
    status: "completed",
    implementedArtifacts: [
  "container component",
  "presentational component",
  "testable props"
],
    notes: "Design pattern container is completed: the role, trade-off, and tested contract are explicit.",
  };
}
