import { createSlice } from "@reduxjs/toolkit";
import { getAllRoutines, modifyExercise } from "./RoutinesAsyncThunk";
import { ResponseStatus, RoutineStore } from "@/src/types/Store";
import data from "@/data.json";

const initialState: RoutineStore = {
  currentRoutineName: data.currentRoutineName,
  routines: data.routines,

  getAllRoutinesStatus: ResponseStatus.IDLE,
  getAllRoutinesErrorMessage: "",
  isGettingAllRoutines: false,

  modifyExerciseStatus: ResponseStatus.IDLE,
  isModifyingRoutines: false,
  modifyExerciseErrorMessage: "",
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
        console.log("payload");
        console.log(payload);

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
    builder
      .addCase(modifyExercise.pending, (state) => {
        state.modifyExerciseStatus = ResponseStatus.PENDING;
        state.isModifyingRoutines = true;
        state.modifyExerciseErrorMessage = "";
      })
      .addCase(modifyExercise.fulfilled, (state) => {
        state.modifyExerciseStatus = ResponseStatus.FULFILLED;
        state.isModifyingRoutines = false;
      })
      .addCase(modifyExercise.rejected, (state, { error }) => {
        state.modifyExerciseStatus = ResponseStatus.REJECTED;
        state.isModifyingRoutines = false;
        state.modifyExerciseErrorMessage = error.message ?? "Error modifying one exercise";
      });
  },
});

export const {} = routinesSlice.actions;

export default routinesSlice.reducer;
