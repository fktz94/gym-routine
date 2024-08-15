import { useContext } from "react";
import EditRoutineContext from "./EditRoutineContext";

export default function useEditRoutineContext() {
  const routineContext = useContext(EditRoutineContext);
  if (!routineContext) throw new Error("Failed to load EditRoutineContext");
  const { selectedRoutine, selectedDay } = routineContext;
  return { selectedRoutine, selectedDay };
}
