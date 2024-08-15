import { RoutineDay, RoutinesData } from "./Routines";

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
}

export interface ModifyExerciseAsyncThunkProps {
  routineId: string;
  selectedDay: number;
  exerciseName: string;
  selectedSerie: number;
  newWeightValue: string | number;
  makeItCurrent: boolean;
}

export interface CreateNewRoutineAsyncThunkProps {
  routineData: RoutineDay[];
  routineName: string;
}
