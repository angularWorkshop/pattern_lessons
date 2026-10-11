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
  topic: "Test Doubles, contract tests и fake infrastructure",
  exercise: "Написать in-memory repository и прогнать use-case tests без HTTP.",
  requiredArtifacts: [
  "test data builder",
  "fake dependency",
  "contract scenario"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "testing",
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
    pattern: "testing",
    status: "completed",
    implementedArtifacts: [
  "test data builder",
  "fake dependency",
  "contract scenario"
],
    notes: "Design pattern testing is completed: the role, trade-off, and tested contract are explicit.",
  };
}
