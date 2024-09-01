import { useContext } from "react";
import NewRoutineContext from "./NewRoutineContext";

export default function useNewRoutineContext() {
  const routineContext = useContext(NewRoutineContext);
  if (!routineContext) throw new Error("Failed to load NewRoutineContext");
  const {
    handleAddOneExercise,
    handleAddOneWarmUpExercise,
    handleClearWarmUp,
    handleDays,
    handleDeleteOneExercise,
    handleDeleteOneWarmUpExercise,
    handleEditOneExercise,
    handleEditOneWarmUpExercise,
    handleName,
    handleStep,
    hasWarmUpRoutine,
    newRoutineState,
    step,
    toggleWarmUpRoutine,
  } = routineContext;
  return {
    handleAddOneExercise,
    handleAddOneWarmUpExercise,
    handleDays,
    handleDeleteOneExercise,
    handleDeleteOneWarmUpExercise,
    handleEditOneExercise,
    handleEditOneWarmUpExercise,
    handleName,
    handleStep,
    hasWarmUpRoutine,
    newRoutineState,
    step,
    toggleWarmUpRoutine,
    handleClearWarmUp,
  };
}
