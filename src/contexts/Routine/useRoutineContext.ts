import { useContext } from "react";
import RoutineContext from "./RoutineContext";

export default function useRoutineContext() {
  const routineContext = useContext(RoutineContext);
  if (!routineContext) throw new Error("Failed to load RoutineDayContext");
  const { currentDay, data, id, madeOn, name } = routineContext;
  return { currentDay, data, id, madeOn, name };
}
