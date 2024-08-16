import { RoutinesData } from "@/src/types/Routines";
import {
  CreateNewRoutineAsyncThunkProps,
  EditRoutineAsyncThunkProps,
  ModifyExerciseAsyncThunkProps,
} from "@/src/types/Store";
import { getRoutines, storeRoutines } from "@/src/utils/AsyncStorage/Routines";
import { addNewRoutine, editOldRoutine, modifyOneExercise } from "@/src/utils/Store/Routine";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
      routines: { routines, currentRoutineId },
    } = getState(); // Learn how to type AsyncThunk

    // It's done this way because I'm using LocalStorage. It'd be simpler by making API calls to its correspondant paths.
    const modifiedRoutines = modifyOneExercise({
      routines,
      routineId,
      selectedDay,
      exerciseName,
      selectedSerie,
      newWeightValue,
      makeItCurrent,
    });

    const payload = { routines: modifiedRoutines, currentRoutineId };

    try {
      await storeRoutines(payload);
      dispatch(getAllRoutines());
    } catch (error) {
      throw error;
    }
  }
);

export const createNewRoutine = createAsyncThunk(
  "routines/createNewRoutine",
  async ({ routineData, routineName }: CreateNewRoutineAsyncThunkProps, { getState, dispatch }) => {
    const {
      routines: { routines, currentRoutineId },
    } = getState(); // Learn how to type AsyncThunk

    const updatedRoutines = addNewRoutine({
      routineData,
      routineName,
      prevRoutinesData: { routines, currentRoutineId },
    });

    try {
      await storeRoutines(updatedRoutines);
      dispatch(getAllRoutines());
    } catch (error) {
      throw error;
    }
  }
);

export const editRoutine = createAsyncThunk(
  "routines/editRoutine",
  async ({ routineData }: EditRoutineAsyncThunkProps, { getState, dispatch }) => {
    const {
      routines: { routines, currentRoutineId },
    } = getState(); // Learn how to type AsyncThunk

    const updatedRoutines = editOldRoutine({ routineData, prevRoutinesData: routines });

    const payload: RoutinesData = {
      currentRoutineId,
      routines: updatedRoutines,
    };

    try {
      await storeRoutines(payload);
      dispatch(getAllRoutines());
    } catch (error) {
      throw error;
    }
  }
);
