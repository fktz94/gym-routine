import { createSlice } from "@reduxjs/toolkit";

const initialState: RoutineStructure = {
  currentDay: 0,
  data: [],
  id: "",
  madeOn: "",
  name: "",
};

export const newRoutineSlice = createSlice({
  name: "newRoutine",
  initialState,
  reducers: {
    setNewRoutineName: (state, { payload }) => {
      state.name = payload;
    },
    setNewRoutineMadeOn: (state, { payload }) => {
      state.madeOn = payload;
    },
    setNewRoutineData: (state, { payload }) => {
      state.data = payload;
    },
    setNewRoutineInitialDay: (state, { payload }) => {
      state.currentDay = payload;
    },
  },
});

export const {
  setNewRoutineData,
  setNewRoutineInitialDay,
  setNewRoutineMadeOn,
  setNewRoutineName,
} = newRoutineSlice.actions;

export default newRoutineSlice.reducer;
