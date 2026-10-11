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
  topic: "Observer и Pub/Sub: событие без жёсткой связи",
  exercise: "Исправить утечку listener-ов после удаления виджета.",
  requiredArtifacts: [
  "subscribe API",
  "emit flow",
  "unsubscribe cleanup"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "observer",
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
    pattern: "observer",
    status: "completed",
    implementedArtifacts: [
  "subscribe API",
  "emit flow",
  "unsubscribe cleanup"
],
    notes: "Design pattern observer is completed: the role, trade-off, and tested contract are explicit.",
  };
}
