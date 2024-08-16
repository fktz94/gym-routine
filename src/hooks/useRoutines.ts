import { useAppSelector } from "./reactReduxHook";

export default function useRoutines() {
  const { currentRoutineId, routines } = useAppSelector(({ routines }) => routines);

  const currentRoutine = routines.find((el) => el.id === currentRoutineId);
  const pastRoutines = routines.filter((el) => el.id !== currentRoutineId);
  const noRoutines = routines.length === 0;

  return { currentRoutine, pastRoutines, routines, noRoutines };
}
