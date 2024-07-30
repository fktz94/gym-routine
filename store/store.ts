import { configureStore } from "@reduxjs/toolkit";
import routinesReducer from "./Routines/RoutinesSlice";

export const store = configureStore({
  reducer: {
    routines: routinesReducer,
  },
});
