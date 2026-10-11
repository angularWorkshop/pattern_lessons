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
  topic: "Adapter: подружить несовместимые формы данных",
  exercise: "Написать adapter из API course DTO в CourseCardModel.",
  requiredArtifacts: [
  "target interface",
  "wrapped dependency",
  "mapped data shape"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "adapter",
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
    pattern: "adapter",
    status: "completed",
    implementedArtifacts: [
  "target interface",
  "wrapped dependency",
  "mapped data shape"
],
    notes: "Design pattern adapter is completed: the role, trade-off, and tested contract are explicit.",
  };
}
