import { useAppSelector } from "./reactReduxHook";

export default function useRoutines(props: { selectedRoutineId: string } | undefined) {
  const { currentRoutineId, routines } = useAppSelector(({ routines }) => routines);

  const currentRoutine = routines.find((el) => el.id === currentRoutineId);
  const pastRoutines = routines.filter((el) => el.id !== currentRoutineId);
  const noRoutines = routines.length === 0;

  const selectedRoutine = routines.filter((el) => el.id === props?.selectedRoutineId);

  return { currentRoutine, pastRoutines, routines, noRoutines, selectedRoutine };
}
