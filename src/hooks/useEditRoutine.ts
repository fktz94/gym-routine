import useRoutines from "./useRoutines";

const useEditRoutine = ({ routineId }: { routineId: string }) => {
  const { selectedRoutine } = useRoutines({ selectedRoutineId: routineId });
  const data = selectedRoutine[0];

  return { data };
};

export default useEditRoutine;
