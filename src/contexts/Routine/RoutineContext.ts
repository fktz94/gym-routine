import { RoutineStructure } from "@/src/types/Routines";
import { createContext } from "react";

interface RoutineContextProps extends RoutineStructure {
  selectedDay: number;
}

const RoutineContext = createContext<RoutineContextProps | null>(null);

export default RoutineContext;
