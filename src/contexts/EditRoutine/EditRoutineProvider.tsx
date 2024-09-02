import useEditRoutine from "@/src/hooks/useEditRoutine";
import EditRoutineContext from "./EditRoutineContext";

type Props = {
  children: React.ReactNode;
  routineId: string;
  selectedDay: string;
};

export default function EditRoutineProvider({ children, routineId, selectedDay }: Props) {
  const {
    editRoutineState,
    handleAddOneExercise,
    handleDeleteOneExercise,
    originalRoutine,
    isCurrent,
    handleSetToCurrent,
    toCurrent,
    handleName,
    handleEditOneExercise,

    handleAddOneWarmUpExercise,
    handleEditOneWarmUpExercise,
    handleDeleteOneWarmUpExercise,
  } = useEditRoutine({ routineId });

  return (
    <EditRoutineContext.Provider
      value={{
        selectedRoutine: editRoutineState,
        selectedDay,
        handleAddOneExercise,
        handleDeleteOneExercise,
        originalRoutine,
        isCurrent,
        handleSetToCurrent,
        toCurrent,
        handleName,
        handleEditOneExercise,

        handleAddOneWarmUpExercise,
        handleEditOneWarmUpExercise,
        handleDeleteOneWarmUpExercise,
      }}
    >
      {children}
    </EditRoutineContext.Provider>
  );
}
