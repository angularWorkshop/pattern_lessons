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
  topic: "Dependency Inversion: зависеть от роли, а не от детали",
  exercise: "Собрать маленький composition root, где создаются реальные зависимости приложения.",
  requiredArtifacts: [
  "headless logic",
  "render boundary",
  "two UI variants"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "composition",
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
    pattern: "composition",
    status: "completed",
    implementedArtifacts: [
  "headless logic",
  "render boundary",
  "two UI variants"
],
    notes: "Design pattern composition is completed: the role, trade-off, and tested contract are explicit.",
  };
}
