export interface ExerciseObj {
  id: number;
  title: string;
  subTitle?: string;
  breakMin: string;
  breakSec: string;
}

export interface HomeExercisObj {
  id: number;
  values: ExerciseObj[];
}
