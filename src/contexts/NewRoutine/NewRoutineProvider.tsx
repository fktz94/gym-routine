import NewRoutineContext from "./NewRoutineContext";
import useNewRoutine from "@/src/hooks/useNewRoutine";

type Props = {
  children: React.ReactNode;
};

export default function NewRoutineProvider({ children }: Props) {
  const {
    handleName,
    handleStep,
    step,
    handleDays,
    hasWarmUpRoutine,
    toggleWarmUpRoutine,
    newRoutineState,
    handleAddOneExercise,
    handleDeleteOneExercise,
  } = useNewRoutine();

  return (
    <NewRoutineContext.Provider
      value={{
        handleName,
        handleStep,
        step,
        handleDays,
        hasWarmUpRoutine,
        toggleWarmUpRoutine,
        newRoutineState,
        handleAddOneExercise,
        handleDeleteOneExercise,
      }}
    >
      {children}
    </NewRoutineContext.Provider>
  );
}
