import { useAppSelector } from "./reactReduxHook";

export default function useRoutines() {
  const { currentRoutineName, routines } = useAppSelector(({ routines }) => routines);

  const currentRoutine = routines.find((el) => el.name === currentRoutineName) || routines[0];
  const pastRoutines = routines.filter((el) => el.name !== currentRoutineName);

  return { currentRoutine, pastRoutines, routines };
}
