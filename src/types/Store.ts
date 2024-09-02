import { RoutineDay, RoutinesData, RoutineStructure } from "./Routines";

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

  createRoutineStatus: ResponseStatus;
  isCreatingRoutine: boolean;
  createRoutineErrorMessage: string;

  editRoutineStatus: ResponseStatus;
  isEditingRoutine: boolean;
  editRoutineErrorMessage: string;

  deleteRoutineStatus: ResponseStatus;
  isDeletingRoutine: boolean;
  deleteRoutineErrorMessage: string;

  concludeExerciseStatus: ResponseStatus;
  isConcludingExerciseRoutine: boolean;
  concludeExerciseErrorMessage: string;
}

export interface ModifyExerciseAsyncThunkProps {
  routineId: string;
  selectedDay: number;
  exerciseName: string;
  selectedSerie: number;
  newWeightValue: string;
  makeItCurrent: boolean;
}

export interface CreateNewRoutineAsyncThunkProps {
  routineData: RoutineDay[];
  routineName: string;
  routineWarmUp: RoutineDay;
}

export interface EditRoutineAsyncThunkProps {
  routineData: RoutineStructure;
  setToCurrentRoutine?: boolean;
}
