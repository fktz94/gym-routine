import { ModifyOneExerciseProps } from "@/src/types/Store";
import { getRoutines } from "@/src/utils/AsyncStorage/Routines";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllRoutines = createAsyncThunk("routines/getAllRoutines", async () => {
  try {
    const routines = await getRoutines();
    return routines;
  } catch (error) {
    throw error;
  }
});

export const modifyOneExercise = createAsyncThunk(
  "routines/modifyOneExercise",
  async ({ index, data }: ModifyOneExerciseProps, { getState }) => {
    const storedData = getState();
    console.log(storedData);
    console.log(index);
    console.log(data);
  }
);
