import { Exercise } from "./Routines";

export enum NewRoutineActionsTypes {
  SETNAME = "setName",
  SETDAYS = "setDays",
  ADDEXERCISE = "addExercise",
  DELETEEXERCISE = "deleteExercise",
}

export type AddExercisePayloadType = { exerciseData: Exercise; dayIndex: number };
export type DeleteExercisePayloadType = { exerciseIndex: number; dayIndex: number };

export type NewRoutineActions =
  | { type: NewRoutineActionsTypes.SETNAME; payload: string }
  | { type: NewRoutineActionsTypes.SETDAYS; payload: number }
  | { type: NewRoutineActionsTypes.ADDEXERCISE; payload: AddExercisePayloadType }
  | { type: NewRoutineActionsTypes.DELETEEXERCISE; payload: DeleteExercisePayloadType };
