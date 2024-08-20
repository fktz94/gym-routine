import { Routine, RoutinesData } from "./Routines";
import {
  CreateNewRoutineAsyncThunkProps,
  EditRoutineAsyncThunkProps,
  ModifyExerciseAsyncThunkProps,
} from "./Store";

export interface ModifyOneExerciseUtilsProps extends ModifyExerciseAsyncThunkProps {
  routines: Routine;
}

export interface AddNewRoutineUtilsProps extends CreateNewRoutineAsyncThunkProps {
  prevRoutinesData: RoutinesData;
}

export interface EditRoutineUtilsProps extends EditRoutineAsyncThunkProps {
  prevRoutinesData: Routine;
}

export interface DeleteRoutineUtilsProps {
  routineId: string;
  prevRoutinesData: Routine;
}
