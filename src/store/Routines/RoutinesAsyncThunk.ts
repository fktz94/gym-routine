import { RoutinesData } from "@/src/types/Routines";
import {
  CreateNewRoutineAsyncThunkProps,
  EditRoutineAsyncThunkProps,
  ModifyExerciseAsyncThunkProps,
} from "@/src/types/Store";
import { getRoutines, storeRoutines } from "@/src/utils/AsyncStorage/Routines";
import {
  addNewRoutine,
  concludeDaySelectedRoutine,
  deleteSelectedRoutine,
  editOldRoutine,
  modifyOneExercise,
} from "@/src/utils/Store/Routine";
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
  async (
    { routineData, routineName, routineWarmUp }: CreateNewRoutineAsyncThunkProps,
    { getState, dispatch }
  ) => {
    const {
      routines: { routines, currentRoutineId },
    } = getState(); // Learn how to type AsyncThunk

    const updatedRoutines = addNewRoutine({
      routineData,
      routineName,
      prevRoutinesData: { routines, currentRoutineId },
      routineWarmUp,
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
  async (
    { routineData, setToCurrentRoutine }: EditRoutineAsyncThunkProps,
    { getState, dispatch }
  ) => {
    const {
      routines: { routines, currentRoutineId },
    } = getState(); // Learn how to type AsyncThunk

    const updatedRoutines = editOldRoutine({ routineData, prevRoutinesData: routines });

    const payload: RoutinesData = {
      currentRoutineId: setToCurrentRoutine ? routineData.id : currentRoutineId,
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

export const deleteRoutine = createAsyncThunk(
  "routines/deleteRoutine",
  async ({ routineId }: { routineId: string }, { getState, dispatch }) => {
    const {
      routines: { routines, currentRoutineId },
    } = getState(); // Learn how to type AsyncThunk
    const updatedRoutines = deleteSelectedRoutine({ routineId, prevRoutinesData: routines });

    const isCurrentRoutine = currentRoutineId === routineId;

    const payload = {
      currentRoutineId: isCurrentRoutine ? undefined : currentRoutineId,
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

export const concludeRoutineDay = createAsyncThunk(
  "routines/concludeRoutineDay",
  async (
    { routineId, dayIndex }: { routineId: string; dayIndex: number },
    { getState, dispatch }
  ) => {
    const {
      routines: { routines, currentRoutineId },
    } = getState(); // Learn how to type AsyncThunk

    const updatedExercises = concludeDaySelectedRoutine({
      dayIndex,
      prevRoutinesData: routines,
      routineId,
    });

    const payload = {
      currentRoutineId: currentRoutineId,
      routines: updatedExercises,
    };

    try {
      await storeRoutines(payload);
      dispatch(getAllRoutines());
    } catch (error) {
      throw error;
    }
  }
);
