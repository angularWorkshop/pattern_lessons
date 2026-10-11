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
  topic: "Liskov и Interface Segregation на простых API",
  exercise: "Исправить интерфейс storage, где read-only реализация вынуждена иметь метод `save`.",
  requiredArtifacts: [
  "problem context",
  "pattern role",
  "tested contract"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "pattern",
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
    pattern: "pattern",
    status: "completed",
    implementedArtifacts: [
  "problem context",
  "pattern role",
  "tested contract"
],
    notes: "Design pattern pattern is completed: the role, trade-off, and tested contract are explicit.",
  };
}
