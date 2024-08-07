export enum ResponseStatus {
  IDLE,
  PENDING,
  REJECTED,
  FULFILLED,
}

export interface RoutineStore extends RoutinesData {
  isInitialLoad: boolean;

  getAllRoutinesStatus: ResponseStatus;
  isGettingAllRoutines: boolean;
  getAllRoutinesErrorMessage: string;

  modifyExerciseStatus: ResponseStatus;
  isModifyingRoutines: boolean;
  modifyExerciseErrorMessage: string;
}

export interface ModifyExerciseAsyncThunkProps {
  routineId: string;
  selectedDay: number;
  exerciseName: string;
  selectedSerie: number;
  newWeightValue: string | number;
  makeItCurrent: boolean;
}
