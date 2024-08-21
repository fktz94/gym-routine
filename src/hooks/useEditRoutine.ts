import { useEffect, useReducer, useState } from "react";
import useRoutines from "./useRoutines";
import { editRoutineReducers, initialState } from "../reducers/EditRoutine/editRoutineReducers";
import {
  AddExercisePayloadType,
  DeleteExercisePayloadType,
  EditExercisePayloadType,
  EditRoutineActionsTypes,
} from "../types/Reducers";
import useRoutineDescription from "./useRoutineDescription";

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
  };
};

export default useEditRoutine;
