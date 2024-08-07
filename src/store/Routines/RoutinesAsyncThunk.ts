import { ModifyExerciseAsyncThunkProps, RoutineStore } from "@/src/types/Store";
import { getRoutines, storeRoutines } from "@/src/utils/AsyncStorage/Routines";
import { modifyOneExercise } from "@/src/utils/Store/Routine";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getAllRoutines = createAsyncThunk("routines/getAllRoutines", async () => {
  try {
    const routines = await getRoutines();
    return routines;
  } catch (error) {
    throw error;
  }
});

export const modifyExercise = createAsyncThunk(
  "routines/modifyExercise",
  async (
    {
      routineId,
      selectedDay,
      exerciseName,
      selectedSerie,
      newWeightValue,
      makeItCurrent,
    }: ModifyExerciseAsyncThunkProps,
    { getState, dispatch }
  ) => {
    const {
      routines: { routines, currentRoutineName },
    } = getState(); // Learn how to type AsyncThunk

    // Is done this way because I'm using LocalStorage. It'd be simpler by making API calls with its correspondant paths.
    const modifiedRoutines = modifyOneExercise({
      routines,
      routineId,
      selectedDay,
      exerciseName,
      selectedSerie,
      newWeightValue,
      makeItCurrent,
    });

    const payload = { routines: modifiedRoutines, currentRoutineName };

    await storeRoutines(payload);

    dispatch(getAllRoutines());
  }
);
