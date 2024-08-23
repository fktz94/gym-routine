import { createSlice } from "@reduxjs/toolkit";
import {
  concludeRoutineDay,
  createNewRoutine,
  deleteRoutine,
  editRoutine,
  getAllRoutines,
  modifyExercise,
} from "./RoutinesAsyncThunk";
import { ResponseStatus, RoutineStore } from "@/src/types/Store";

const initialState: RoutineStore = {
  currentRoutineId: "",
  routines: [],
  isInitialLoad: true,

  getAllRoutinesStatus: ResponseStatus.IDLE,
  isGettingAllRoutines: false,
  getAllRoutinesErrorMessage: "",

  modifyExerciseStatus: ResponseStatus.IDLE,
  isModifyingRoutines: false,
  modifyExerciseErrorMessage: "",

  createRoutineStatus: ResponseStatus.IDLE,
  isCreatingRoutine: false,
  createRoutineErrorMessage: "",

  editRoutineStatus: ResponseStatus.IDLE,
  isEditingRoutine: false,
  editRoutineErrorMessage: "",

  deleteRoutineStatus: ResponseStatus.IDLE,
  isDeletingRoutine: false,
  deleteRoutineErrorMessage: "",

  concludeExerciseStatus: ResponseStatus.IDLE,
  isConcludingExerciseRoutine: false,
  concludeExerciseErrorMessage: "",
};

export const routinesSlice = createSlice({
  name: "routines",
  initialState,
  reducers: {
    resetModifiyExerciseState: (state) => {
      state.modifyExerciseStatus = ResponseStatus.IDLE;
      state.isModifyingRoutines = false;
      state.modifyExerciseErrorMessage = "";
    },
    resetCreateRoutineState: (state) => {
      state.createRoutineStatus = ResponseStatus.IDLE;
      state.isCreatingRoutine = false;
      state.createRoutineErrorMessage = "";
    },
    resetEditRoutineState: (state) => {
      state.editRoutineStatus = ResponseStatus.IDLE;
      state.isEditingRoutine = false;
      state.editRoutineErrorMessage = "";
    },
    resetDeleteRoutineState: (state) => {
      state.deleteRoutineStatus = ResponseStatus.IDLE;
      state.isDeletingRoutine = false;
      state.deleteRoutineErrorMessage = "";
    },
    resetConcludeExerciseState: (state) => {
      state.concludeExerciseStatus = ResponseStatus.IDLE;
      state.isConcludingExerciseRoutine = false;
      state.concludeExerciseErrorMessage = "";
    },
    setIsInitialLoadToFalse: (state) => {
      state.isInitialLoad = false;
    },
  },
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
          state.currentRoutineId = payload.currentRoutineId;
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
        state.modifyExerciseErrorMessage = error.message ?? "Error modifying the exercise";
      });
    builder
      .addCase(createNewRoutine.pending, (state) => {
        state.createRoutineStatus = ResponseStatus.PENDING;
        state.isCreatingRoutine = true;
        state.createRoutineErrorMessage = "";
      })
      .addCase(createNewRoutine.fulfilled, (state) => {
        state.createRoutineStatus = ResponseStatus.FULFILLED;
        state.isCreatingRoutine = false;
      })
      .addCase(createNewRoutine.rejected, (state, { error }) => {
        state.createRoutineStatus = ResponseStatus.REJECTED;
        state.isCreatingRoutine = false;
        state.createRoutineErrorMessage = error.message ?? "Error creating the routine";
      });
    builder
      .addCase(editRoutine.pending, (state) => {
        state.editRoutineStatus = ResponseStatus.PENDING;
        state.isEditingRoutine = true;
        state.editRoutineErrorMessage = "";
      })
      .addCase(editRoutine.fulfilled, (state) => {
        state.editRoutineStatus = ResponseStatus.FULFILLED;
        state.isEditingRoutine = false;
      })
      .addCase(editRoutine.rejected, (state, { error }) => {
        state.editRoutineStatus = ResponseStatus.REJECTED;
        state.isEditingRoutine = false;
        state.editRoutineErrorMessage = error.message ?? "Error editing the routine";
      });
    builder
      .addCase(deleteRoutine.pending, (state) => {
        state.deleteRoutineStatus = ResponseStatus.PENDING;
        state.isDeletingRoutine = true;
        state.deleteRoutineErrorMessage = "";
      })
      .addCase(deleteRoutine.fulfilled, (state) => {
        state.deleteRoutineStatus = ResponseStatus.FULFILLED;
        state.isDeletingRoutine = false;
      })
      .addCase(deleteRoutine.rejected, (state, { error }) => {
        state.deleteRoutineStatus = ResponseStatus.REJECTED;
        state.isDeletingRoutine = false;
        state.deleteRoutineErrorMessage = error.message ?? "Error deleting the routine";
      });
    builder
      .addCase(concludeRoutineDay.pending, (state) => {
        state.concludeExerciseStatus = ResponseStatus.PENDING;
        state.isConcludingExerciseRoutine = true;
        state.concludeExerciseErrorMessage = "";
      })
      .addCase(concludeRoutineDay.fulfilled, (state) => {
        state.concludeExerciseStatus = ResponseStatus.FULFILLED;
        state.isConcludingExerciseRoutine = false;
      })
      .addCase(concludeRoutineDay.rejected, (state, { error }) => {
        state.concludeExerciseStatus = ResponseStatus.REJECTED;
        state.isConcludingExerciseRoutine = false;
        state.concludeExerciseErrorMessage = error.message ?? "Error concluding the day";
      });
  },
});

export const {
  resetModifiyExerciseState,
  setIsInitialLoadToFalse,
  resetCreateRoutineState,
  resetEditRoutineState,
  resetDeleteRoutineState,
  resetConcludeExerciseState,
} = routinesSlice.actions;

export default routinesSlice.reducer;
