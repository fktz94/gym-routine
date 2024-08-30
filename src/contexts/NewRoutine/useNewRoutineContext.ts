import { useContext } from "react";
import NewRoutineContext from "./NewRoutineContext";

export default function useNewRoutineContext() {
  const routineContext = useContext(NewRoutineContext);
  if (!routineContext) throw new Error("Failed to load NewRoutineContext");
  const {
    handleAddOneExercise,
    handleDays,
    handleDeleteOneExercise,
    handleEditOneExercise,
    handleName,
    handleStep,
    hasWarmUpRoutine,
    newRoutineState,
    step,
    toggleWarmUpRoutine,
  } = routineContext;
  return {
    handleAddOneExercise,
    handleDays,
    handleDeleteOneExercise,
    handleEditOneExercise,
    handleName,
    handleStep,
    hasWarmUpRoutine,
    newRoutineState,
    step,
    toggleWarmUpRoutine,
  };
}
