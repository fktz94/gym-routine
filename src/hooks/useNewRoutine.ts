import { useEffect, useState } from "react";
import { monthsOfTheYear } from "../types/Routines";
import useThemeContext from "../contexts/Theme/useThemeContext";

const useNewRoutine = () => {
  const currentMonth = monthsOfTheYear[new Date().getMonth()];

  const [days, setDays] = useState(3);
  const [hasWarmUpRoutine, setHasWarmUpRoutine] = useState(false); // Still have to create a warm up section and state.
  const [name, setName] = useState(currentMonth);
  const [step, setStep] = useState(0);

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
    setName(val);
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
