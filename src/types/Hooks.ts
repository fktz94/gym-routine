import { Exercise, RoutineDay, RoutineStructure } from "./Routines";

export interface UseRoutineDescription {
  id?: string | undefined;
}

export interface UseCreateOrEditExerciseObj {
  exerciseToEdit?: Exercise;
}

export interface UseEditRoutineChanges {
  data: RoutineDay[];
  originalRoutine: RoutineStructure;
  name: string;
  isCurrent: boolean;
  toCurrent: boolean;
  openModal: () => void;
  isChangingName: boolean;
  handleName: (val: string) => void;
  setIsChangingName: (val: boolean) => void;
}
