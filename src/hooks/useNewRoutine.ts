import { useReducer, useState } from "react";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { initialState, newRoutineReducers } from "../reducers/NewRoutine/newRoutineReducers";

const useNewRoutine = () => {
  const [step, setStep] = useState(0);
  const [hasWarmUpRoutine, setHasWarmUpRoutine] = useState(false); // Still have to create a warm up section and state.

  const [days, setDays] = useState(3);

  const [{ name }, dispatch] = useReducer(newRoutineReducers, initialState);

  const { toggleShowBackArrowButton } = useThemeContext();

  const handleStep = ({ goDown = false }) => {
    if (goDown && step === 0) return;
    if (goDown && step === 1) {
      toggleShowBackArrowButton(true);
    } else if (step === 0) {
      toggleShowBackArrowButton(false);
    }
    setStep(goDown ? step - 1 : step + 1);
  };

  const handleName = (val: string) => {
    dispatch({
      type: NewRoutineActionsTypes.SETNAME,
      payload: val,
    });
  };

  const handleDays = (val: number) => {
    setDays(val);
  };

  const toggleWarmUpRoutine = () => setHasWarmUpRoutine(!hasWarmUpRoutine);

  return {
    days,
    name,
    handleDays,
    handleName,
    handleStep,
    step,
    hasWarmUpRoutine,
    toggleWarmUpRoutine,
  };
};

export default useNewRoutine;
