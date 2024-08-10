import { RoutineStructure } from "@/src/types/Routines";
import RoutineContext from "./RoutineContext";

type Props = {
  routine: RoutineStructure;
  children: React.ReactNode;
  selectedDay: number;
};

export default function RoutineProvider({ children, routine, selectedDay }: Props) {
  const { currentDay, data, id, madeOn, name } = routine;
  return (
    <RoutineContext.Provider value={{ currentDay, data, id, madeOn, name, selectedDay }}>
      {children}
    </RoutineContext.Provider>
  );
}
