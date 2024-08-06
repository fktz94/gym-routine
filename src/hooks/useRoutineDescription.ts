import { useState } from "react";
import { useAppSelector } from "./reactReduxHook";
import useRoutines from "./useRoutines";

const useRoutineDescription = ({ id }: UseRoutineDescription) => {
  const { currentRoutine, routines } = useRoutines();

  const isCurrent = id === currentRoutine.id;
  const routine = isCurrent ? currentRoutine : routines.find((el) => el.id === id) || routines[0];

  const currentDay = routine?.currentDay ?? 0;

  const [selectedDay, setSelectedDay] = useState(currentDay);
  const handleSelectedDay = (n: number) => {
    setSelectedDay(n);
  };

  return { handleSelectedDay, routine, selectedDay };
};

export default useRoutineDescription;
