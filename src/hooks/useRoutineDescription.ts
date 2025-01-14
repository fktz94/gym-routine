import { useState } from "react";
import useRoutines from "./useRoutines";
import { UseRoutineDescription } from "../types/Hooks";

const useRoutineDescription = ({ id }: UseRoutineDescription) => {
  const { currentRoutine, routines } = useRoutines();

  const isCurrent = id === currentRoutine?.id;
  const routine = isCurrent ? currentRoutine : routines.find((el) => el.id === id);

  const currentDay = routine?.currentDay || 0;
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const handleSelectedDay = (n: number) => {
    setSelectedDay(n);
  };

  // solve how to updated selected day evertytime it fetches new data

  return { handleSelectedDay, routine, selectedDay, isCurrent };
};

export default useRoutineDescription;
