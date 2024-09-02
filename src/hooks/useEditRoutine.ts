import { useEffect, useReducer, useState } from "react";
import useRoutineDescription from "./useRoutineDescription";
import { editRoutineReducers, initialState } from "../reducers/EditRoutine/editRoutineReducers";
import {
  AddExercisePayloadType,
  DeleteExercisePayloadType,
  EditExercisePayloadType,
  EditRoutineActionsTypes,
} from "../types/Reducers";
import { Exercise } from "../types/Routines";

const useEditRoutine = ({ routineId }: { routineId: string }) => {
  const { routine, isCurrent } = useRoutineDescription({ id: routineId });
  const [toCurrent, setToCurrent] = useState(false);
  const [editRoutineState, dispatch] = useReducer(editRoutineReducers, initialState);
  const setState = () => {
    dispatch({ type: EditRoutineActionsTypes.SETINITIALSTATE, payload: routine });
  };
  const handleAddOneExercise = (payload: AddExercisePayloadType) => {
    dispatch({ type: EditRoutineActionsTypes.ADDEXERCISE, payload });
  };
  const handleEditOneExercise = (payload: EditExercisePayloadType) => {
    dispatch({ type: EditRoutineActionsTypes.EDITEXERCISE, payload });
  };
  const handleDeleteOneExercise = (payload: DeleteExercisePayloadType) => {
    dispatch({ type: EditRoutineActionsTypes.DELETEEXERCISE, payload });
  };
  const handleSetToCurrent = () => {
    setToCurrent(!toCurrent);
  };
  const handleName = (payload: string) => {
    dispatch({ type: EditRoutineActionsTypes.CHANGENAME, payload });
  };

  const handleAddOneWarmUpExercise = ({ exerciseData }: { exerciseData: Exercise }) => {
    dispatch({
      type: EditRoutineActionsTypes.ADDWARMUPEXERCISE,
      payload: { exerciseData },
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
      type: EditRoutineActionsTypes.EDITWARMUPEXERCISE,
      payload: { exerciseData, prevName },
    });
  };
  const handleDeleteOneWarmUpExercise = ({ exerciseIndex }: { exerciseIndex: number }) => {
    dispatch({
      type: EditRoutineActionsTypes.DELETEWARMUPEXERCISE,
      payload: { exerciseIndex },
    });
  };
  useEffect(setState, []);

  return {
    editRoutineState,
    handleAddOneExercise,
    handleDeleteOneExercise,
    originalRoutine: routine,
    isCurrent,
    handleSetToCurrent,
    toCurrent,
    handleName,
    handleEditOneExercise,

    handleAddOneWarmUpExercise,
    handleEditOneWarmUpExercise,
    handleDeleteOneWarmUpExercise,
  };
};

export default useEditRoutine;
