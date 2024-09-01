import { PropsWithChildren } from "react";
import NewRoutineContext from "./NewRoutineContext";
import useNewRoutine from "@/src/hooks/useNewRoutine";

export default function NewRoutineProvider({ children }: PropsWithChildren) {
  const {
    handleName,
    handleStep,
    step,
    handleDays,
    hasWarmUpRoutine,
    toggleWarmUpRoutine,
    newRoutineState,
    handleAddOneExercise,
    handleAddOneWarmUpExercise,
    handleDeleteOneExercise,
    handleDeleteOneWarmUpExercise,
    handleEditOneExercise,
    handleEditOneWarmUpExercise,
    handleClearWarmUp,
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
        handleAddOneWarmUpExercise,
        handleDeleteOneExercise,
        handleDeleteOneWarmUpExercise,
        handleEditOneExercise,
        handleEditOneWarmUpExercise,
        handleClearWarmUp,
      }}
    >
      {children}
    </NewRoutineContext.Provider>
  );
}
