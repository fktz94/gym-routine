import { useState } from "react";
import { monthsOfTheYear } from "../types/Routines";

const useNewRoutine = () => {
  const [step, setStep] = useState(0);

  const currentMonth = monthsOfTheYear[new Date().getMonth()];
  const [name, setName] = useState(currentMonth);

  const [days, setDays] = useState(1);

  const handleStep = ({ down = false }) => {
    if (down && step === 0) return;
    setStep(down ? step - 1 : step + 1);
  };

  const handleName = (val: string) => {
    setName(val);
  };
  const handleDays = (val: number) => {
    setDays(val);
  };

  return { days, name, handleDays, handleName, handleStep, step };
};

export default useNewRoutine;
