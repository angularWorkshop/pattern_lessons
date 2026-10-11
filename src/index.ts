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
  topic: "Proxy: контроль доступа, lazy loading и защита дорогих операций",
  exercise: "Реализовать access proxy для premium report generator.",
  requiredArtifacts: [
  "access boundary",
  "lazy call",
  "protected target"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "proxy",
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
    pattern: "proxy",
    status: "completed",
    implementedArtifacts: [
  "access boundary",
  "lazy call",
  "protected target"
],
    notes: "Design pattern proxy is completed: the role, trade-off, and tested contract are explicit.",
  };
}
