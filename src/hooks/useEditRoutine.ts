import { useEffect, useReducer } from "react";
import useRoutines from "./useRoutines";
import { editRoutineReducers, initialState } from "../reducers/EditRoutine/editRoutineReducers";
import {
  AddExercisePayloadType,
  DeleteExercisePayloadType,
  EditRoutineActionsTypes,
} from "../types/Reducers";
import useRoutineDescription from "./useRoutineDescription";

const useEditRoutine = ({ routineId }: { routineId: string }) => {
  const { routine } = useRoutineDescription({ id: routineId });

  const [editRoutineState, dispatch] = useReducer(editRoutineReducers, initialState);

  const setState = () => {
    dispatch({ type: EditRoutineActionsTypes.SETINITIALSTATE, payload: routine });
  };

  useEffect(setState, []);

  const handleAddOneExercise = (payload: AddExercisePayloadType) => {
    dispatch({ type: EditRoutineActionsTypes.ADDEXERCISE, payload });
  };

  const handleDeleteOneExercise = (payload: DeleteExercisePayloadType) => {
    dispatch({ type: EditRoutineActionsTypes.DELETEEXERCISE, payload });
  };

  return {
    editRoutineState,
    handleAddOneExercise,
    handleDeleteOneExercise,
    originalRoutine: routine,
  };
};

export default useEditRoutine;
