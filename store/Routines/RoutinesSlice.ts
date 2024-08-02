import { createSlice } from "@reduxjs/toolkit";
import { getAllRoutines } from "./RoutinesAsyncThunk";
import { ResponseStatus, RoutineStore } from "@/types/Store";
import data from "@/data.json";
import { findCurrentRoutine } from "@/utils/Store/Routine";

const initialState: RoutineStore = {
  currentRoutineData: data.routines[0],
  currentRoutineName: data.currentRoutineName,
  errorMessage: "",
  isLoading: false,
  routines: data.routines,
  status: ResponseStatus.IDLE,
};

export const routinesSlice = createSlice({
  name: "routines",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoutines.pending, (state) => {
        state.status = ResponseStatus.PENDING;
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(getAllRoutines.fulfilled, (state, { payload }) => {
        state.status = ResponseStatus.FULFILLED;
        state.isLoading = false;
        if (payload) {
          state.routines = payload.routines;
          state.currentRoutineName = payload.currentRoutineName;
          state.currentRoutineData = findCurrentRoutine(payload);
        }
      })
      .addCase(getAllRoutines.rejected, (state, { error }) => {
        state.status = ResponseStatus.REJECTED;
        state.isLoading = false;
        state.errorMessage = error.message ?? "Error getting all routines";
      });
  },
});

export const {} = routinesSlice.actions;

export default routinesSlice.reducer;
