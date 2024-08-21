import { Exercise, RoutineStructure } from "./Routines";

export enum NewRoutineActionsTypes {
  SETNAME = "setName",
  SETDAYS = "setDays",
  ADDEXERCISE = "addExercise",
  DELETEEXERCISE = "deleteExercise",
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
  | { type: NewRoutineActionsTypes.DELETEEXERCISE; payload: DeleteExercisePayloadType };

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
