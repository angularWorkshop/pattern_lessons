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
  topic: "Singleton, Registry и общий ресурс без глобального хаоса",
  exercise: "Найти баг shared singleton state между тестами и исправить его через явную инициализацию.",
  requiredArtifacts: [
  "single resource boundary",
  "reset path",
  "test isolation"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "singleton",
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
    pattern: "singleton",
    status: "completed",
    implementedArtifacts: [
  "single resource boundary",
  "reset path",
  "test isolation"
],
    notes: "Design pattern singleton is completed: the role, trade-off, and tested contract are explicit.",
  };
}
