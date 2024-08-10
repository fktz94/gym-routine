import { useReducer, useState } from "react";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { initialState, newRoutineReducers } from "../reducers/NewRoutine/newRoutineReducers";
import { NewRoutineActionsTypes } from "../types/Reducers";

const useNewRoutine = () => {
  const [step, setStep] = useState(0);
  const [hasWarmUpRoutine, setHasWarmUpRoutine] = useState(false); // Still have to create a warm up section and state.

  const [newRoutineState, dispatch] = useReducer(newRoutineReducers, initialState);

  const { toggleShowBackArrowButton } = useThemeContext();

  const handleStep = ({ direction }: { direction: "up" | "down" }) => {
    const goUp = direction === "up";
    const goDown = direction === "down";

    if (goDown && step === 0) return;
    if (goDown && step === 1) {
      toggleShowBackArrowButton(true);
    } else if (goUp && step === 0) {
      toggleShowBackArrowButton(false);
    }

    setStep(goDown ? step - 1 : goUp ? step + 1 : step);
  };

  const handleName = (val: string) => {
    dispatch({
      type: NewRoutineActionsTypes.SETNAME,
      payload: val,
    });
  };

  const handleDays = (val: number) => {
    dispatch({
      type: NewRoutineActionsTypes.SETDAYS,
      payload: val,
    });
  };

  const toggleWarmUpRoutine = () => setHasWarmUpRoutine(!hasWarmUpRoutine);

  return {
    newRoutineState,
    handleDays,
    handleName,
    handleStep,
    step,
    hasWarmUpRoutine,
    toggleWarmUpRoutine,
  };
};

export default useNewRoutine;
