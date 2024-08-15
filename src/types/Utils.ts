import { Routine, RoutinesData } from "./Routines";
import { CreateNewRoutineAsyncThunkProps, ModifyExerciseAsyncThunkProps } from "./Store";

export interface ModifyOneExerciseUtilsProps extends ModifyExerciseAsyncThunkProps {
  routines: Routine;
}

export interface AddNewRoutineUtilsProps extends CreateNewRoutineAsyncThunkProps {
  prevRoutinesData: RoutinesData;
}
