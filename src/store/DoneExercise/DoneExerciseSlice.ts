import { createSlice } from "@reduxjs/toolkit";

const initialState: Array<string> = [];

export const doneExercisesSlice = createSlice({
  name: "doneExercise",
  initialState,
  reducers: {
    toggleExerciseState: (state, { payload }) => {
      const index = state.findIndex((ex) => payload === ex);
      const isDone = index !== -1;
      if (isDone) {
        state.splice(index, 1);
      } else {
        state.push(payload);
      }
    },
  },
});

export const { toggleExerciseState } = doneExercisesSlice.actions;

export default doneExercisesSlice.reducer;
