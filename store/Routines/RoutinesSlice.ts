import { createSlice } from "@reduxjs/toolkit";
import { getAllRoutines } from "./RoutinesAsyncThunk";
import { ResponseStatus, RoutineStore } from "@/types/Store";

const initialState: RoutineStore = {
  currentRoutine: "",
  errorMessage: "",
  isLoading: false,
  routines: [],
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
      .addCase(getAllRoutines.fulfilled, (state, action) => {
        state.status = ResponseStatus.FULFILLED;
        state.isLoading = false;
      })
      .addCase(getAllRoutines.rejected, (state, action) => {
        state.status = ResponseStatus.REJECTED;
        state.isLoading = false;
        state.errorMessage = "error from payload";
      });
  },
});

export const {} = routinesSlice.actions;

export default routinesSlice.reducer;
