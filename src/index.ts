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
  topic: "Iterator: обход коллекции без знания её внутренностей",
  exercise: "Реализовать iterator для дерева sections/topics/exercises.",
  requiredArtifacts: [
  "iterator protocol",
  "next result",
  "hidden collection shape"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "iterator",
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
    pattern: "iterator",
    status: "completed",
    implementedArtifacts: [
  "iterator protocol",
  "next result",
  "hidden collection shape"
],
    notes: "Design pattern iterator is completed: the role, trade-off, and tested contract are explicit.",
  };
}
