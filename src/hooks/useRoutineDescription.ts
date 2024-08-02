import { useState } from "react";

const useRoutineDescription = ({ currentRoutineData, routines, id }: UseRoutineDescription) => {
  const isCurrent = id === currentRoutineData.id;
  const routine = isCurrent ? currentRoutineData : routines.find((el) => el.id === id);

  const currentDay = routine?.currentDay ?? 0;

  const [selectedDay, setSelectedDay] = useState(currentDay);
  const handleSelectedDay = (n: number) => {
    setSelectedDay(n);
  };

  return { handleSelectedDay, routine, selectedDay };
};

export default useRoutineDescription;
