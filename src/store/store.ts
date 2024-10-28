import { configureStore } from "@reduxjs/toolkit";
import routinesReducer from "./Routines/RoutinesSlice";
import doneExercisesReducer from "./DoneExercise/DoneExerciseSlice";

export const store = configureStore({
  reducer: {
    routines: routinesReducer,
    doneExercise: doneExercisesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
