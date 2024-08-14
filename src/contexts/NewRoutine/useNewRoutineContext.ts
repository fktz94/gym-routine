import { useContext } from "react";
import NewRoutineContext from "./NewRoutineContext";

export default function useNewRoutineContext() {
  const routineContext = useContext(NewRoutineContext);
  if (!routineContext) throw new Error("Failed to load NewRoutineContext");
  const {
    handleDays,
    handleName,
    handleStep,
    hasWarmUpRoutine,
    newRoutineState,
    step,
    toggleWarmUpRoutine,
    handleAddOneExercise,
    handleDeleteOneExercise,
  } = routineContext;
  return {
    newRoutineState,
    handleDays,
    handleName,
    handleStep,
    hasWarmUpRoutine,
    step,
    toggleWarmUpRoutine,
    handleAddOneExercise,
    handleDeleteOneExercise,
  };
}
