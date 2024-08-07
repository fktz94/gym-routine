import { configureStore } from "@reduxjs/toolkit";
import routinesReducer from "./Routines/RoutinesSlice";

export const store = configureStore({
  reducer: {
    routines: routinesReducer,
  },

  // To avoid annoying development checks 'cause of large states ... ??
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
