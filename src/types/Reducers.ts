import { Exercise, RoutineStructure } from "./Routines";

export enum NewRoutineActionsTypes {
  SETNAME = "setName",
  SETDAYS = "setDays",
  ADDEXERCISE = "addExercise",
  ADDWARMUPEXERCISE = "addWarmUpExercise",
  EDITEXERCISE = "editExercise",
  EDITWARMUPEXERCISE = "editWarmUpExercise",
  DELETEEXERCISE = "deleteExercise",
  DELETEWARMUPEXERCISE = "deleteWarmUpExercise",
  CLEANWARMUP = "cleanWarmUp",
}

export type AddExercisePayloadType = { exerciseData: Exercise; dayIndex: number };
export type EditExercisePayloadType = {
  exerciseData: Exercise;
  dayIndex: number;
  prevName: string;
};
export type DeleteExercisePayloadType = { exerciseIndex: number; dayIndex: number };

export type NewRoutineActions =
  | { type: NewRoutineActionsTypes.SETNAME; payload: string }
  | { type: NewRoutineActionsTypes.SETDAYS; payload: number }
  | { type: NewRoutineActionsTypes.ADDEXERCISE; payload: AddExercisePayloadType }
  | { type: NewRoutineActionsTypes.ADDWARMUPEXERCISE; payload: { exerciseData: Exercise } }
  | { type: NewRoutineActionsTypes.EDITEXERCISE; payload: EditExercisePayloadType }
  | {
      type: NewRoutineActionsTypes.EDITWARMUPEXERCISE;
      payload: { exerciseData: Exercise; prevName: string };
    }
  | { type: NewRoutineActionsTypes.DELETEEXERCISE; payload: DeleteExercisePayloadType }
  | { type: NewRoutineActionsTypes.DELETEWARMUPEXERCISE; payload: { exerciseIndex: number } }
  | { type: NewRoutineActionsTypes.CLEANWARMUP; payload: undefined };

export enum EditRoutineActionsTypes {
  SETINITIALSTATE = "setInitialState",
  ADDEXERCISE = "addExercise",
  EDITEXERCISE = "editExercise",
  DELETEEXERCISE = "deleteExercise",
  CHANGENAME = "changeName",
}
export type EditRoutineActions =
  | { type: EditRoutineActionsTypes.SETINITIALSTATE; payload: RoutineStructure | undefined }
  | { type: EditRoutineActionsTypes.ADDEXERCISE; payload: AddExercisePayloadType }
  | { type: EditRoutineActionsTypes.EDITEXERCISE; payload: EditExercisePayloadType }
  | { type: EditRoutineActionsTypes.DELETEEXERCISE; payload: DeleteExercisePayloadType }
  | { type: EditRoutineActionsTypes.CHANGENAME; payload: string };
