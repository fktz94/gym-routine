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
      }}
    >
      {children}
    </NewRoutineContext.Provider>
  );
}
