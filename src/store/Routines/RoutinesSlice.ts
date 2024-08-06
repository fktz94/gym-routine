import { createSlice } from "@reduxjs/toolkit";
import { getAllRoutines, modifyOneExercise } from "./RoutinesAsyncThunk";
import { ResponseStatus, RoutineStore } from "@/src/types/Store";
import data from "@/data.json";

const initialState: RoutineStore = {
  currentRoutineName: data.currentRoutineName,
  routines: data.routines,

  getAllRoutinesStatus: ResponseStatus.IDLE,
  getAllRoutinesErrorMessage: "",
  isGettingAllRoutines: false,
};

export const routinesSlice = createSlice({
  name: "routines",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoutines.pending, (state) => {
        state.getAllRoutinesStatus = ResponseStatus.PENDING;
        state.isGettingAllRoutines = true;
        state.getAllRoutinesErrorMessage = "";
      })
      .addCase(getAllRoutines.fulfilled, (state, { payload }) => {
        state.getAllRoutinesStatus = ResponseStatus.FULFILLED;
        state.isGettingAllRoutines = false;
        if (payload) {
          state.routines = payload.routines;
          state.currentRoutineName = payload.currentRoutineName;
        }
      })
      .addCase(getAllRoutines.rejected, (state, { error }) => {
        state.getAllRoutinesStatus = ResponseStatus.REJECTED;
        state.isGettingAllRoutines = false;
        state.getAllRoutinesErrorMessage = error.message ?? "Error getting all routines";
      });
    // .addCase(modifyOneExercise.pending, () => {})
    // .addCase(modifyOneExercise.fulfilled, () => {})
    // .addCase(modifyOneExercise.rejected, () => {});
  },
});

export const {} = routinesSlice.actions;

export default routinesSlice.reducer;
