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
