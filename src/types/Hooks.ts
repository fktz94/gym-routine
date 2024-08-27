import { Exercise } from "./Routines";

export interface UseRoutineDescription {
  id?: string | undefined;
}

export interface UseCreateOrEditExerciseObj {
  exerciseToEdit?: Exercise;
}
