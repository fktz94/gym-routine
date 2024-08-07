import { useContext } from "react";
import RoutineContext from "./RoutineContext";

export default function useRoutineContext() {
  const routineContext = useContext(RoutineContext);
  if (!routineContext) throw new Error("Failed to load RoutineDayContext");
  const { currentDay, data, id, madeOn, name, selectedDay } = routineContext;
  return { currentDay, data, routineId: id, madeOn, routineName: name, selectedDay };
}
