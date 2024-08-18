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
  };
}
