import { useReducer, useState } from "react";
import useHeaderContext from "../contexts/Header/useHeaderContext";
import { initialState, newRoutineReducers } from "../reducers/NewRoutine/newRoutineReducers";
import {
  AddExercisePayloadType,
  DeleteExercisePayloadType,
  EditExercisePayloadType,
  NewRoutineActionsTypes,
} from "../types/Reducers";
import { Exercise } from "../types/Routines";

const useNewRoutine = () => {
  const [step, setStep] = useState(0);
  const [hasWarmUpRoutine, setHasWarmUpRoutine] = useState(false);

  const [newRoutineState, dispatch] = useReducer(newRoutineReducers, initialState);

  const { toggleShowBackArrowButton } = useHeaderContext();

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

  const handleAddOneExercise = ({ exerciseData, dayIndex }: AddExercisePayloadType) => {
    dispatch({
      type: NewRoutineActionsTypes.ADDEXERCISE,
      payload: { dayIndex, exerciseData },
    });
  };

  const handleAddOneWarmUpExercise = ({ exerciseData }: { exerciseData: Exercise }) => {
    dispatch({
      type: NewRoutineActionsTypes.ADDWARMUPEXERCISE,
      payload: { exerciseData },
    });
  };

  const handleEditOneExercise = ({ exerciseData, dayIndex, prevName }: EditExercisePayloadType) => {
    dispatch({
      type: NewRoutineActionsTypes.EDITEXERCISE,
      payload: { dayIndex, exerciseData, prevName },
    });
  };

  const handleEditOneWarmUpExercise = ({
    exerciseData,
    prevName,
  }: {
    exerciseData: Exercise;
    prevName: string;
  }) => {
    dispatch({
      type: NewRoutineActionsTypes.EDITWARMUPEXERCISE,
      payload: { exerciseData, prevName },
    });
  };

  const handleDeleteOneExercise = ({ exerciseIndex, dayIndex }: DeleteExercisePayloadType) => {
    dispatch({
      type: NewRoutineActionsTypes.DELETEEXERCISE,
      payload: { dayIndex, exerciseIndex },
    });
  };

  const handleDeleteOneWarmUpExercise = ({ exerciseIndex }: { exerciseIndex: number }) => {
    dispatch({
      type: NewRoutineActionsTypes.DELETEWARMUPEXERCISE,
      payload: { exerciseIndex },
    });
  };

  const handleClearWarmUp = () => {
    dispatch({
      type: NewRoutineActionsTypes.CLEANWARMUP,
      payload: undefined,
    });
  };

  const toggleWarmUpRoutine = () => setHasWarmUpRoutine(!hasWarmUpRoutine);

  return {
    handleAddOneExercise,
    handleAddOneWarmUpExercise,
    handleClearWarmUp,
    handleDays,
    handleDeleteOneExercise,
    handleDeleteOneWarmUpExercise,
    handleEditOneExercise,
    handleEditOneWarmUpExercise,
    handleName,
    handleStep,
    hasWarmUpRoutine,
    newRoutineState,
    step,
    toggleWarmUpRoutine,
  };
};

export default useNewRoutine;
