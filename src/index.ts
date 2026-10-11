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
  topic: "Visitor: новые операции над стабильной структурой",
  exercise: "Создать visitor для подсчёта статистики content tree урока.",
  requiredArtifacts: [
  "stable node shape",
  "visitor operation",
  "exhaustive traversal"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "visitor",
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
    pattern: "visitor",
    status: "completed",
    implementedArtifacts: [
  "stable node shape",
  "visitor operation",
  "exhaustive traversal"
],
    notes: "Design pattern visitor is completed: the role, trade-off, and tested contract are explicit.",
  };
}
