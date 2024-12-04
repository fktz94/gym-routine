import { useContext } from "react";
import EditRoutineContext from "./EditRoutineContext";

export default function useEditRoutineContext() {
  const routineContext = useContext(EditRoutineContext);
  if (!routineContext) throw new Error("Failed to load EditRoutineContext");
  const {
    isCurrent,
    selectedRoutine,
    selectedDay,
    handleAddOneExercise,
    handleDeleteOneExercise,
    originalRoutine,
    handleSetToCurrent,
    toCurrent,
    handleName,
    handleEditOneExercise,
    handleAddOneWarmUpExercise,
    handleEditOneWarmUpExercise,
    handleDeleteOneWarmUpExercise,
    toggleWarmUp,
    addWarmUp,
    isDispatching,
  } = routineContext;
  return {
    isCurrent,
    selectedRoutine,
    selectedDay,
    handleAddOneExercise,
    handleDeleteOneExercise,
    originalRoutine,
    handleSetToCurrent,
    toCurrent,
    handleName,
    handleEditOneExercise,
    handleAddOneWarmUpExercise,
    handleEditOneWarmUpExercise,
    handleDeleteOneWarmUpExercise,
    toggleWarmUp,
    addWarmUp,
    isDispatching,
  };
}
