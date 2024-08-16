import { useEffect, useReducer } from "react";
import useRoutines from "./useRoutines";
import { editRoutineReducers, initialState } from "../reducers/EditRoutine/editRoutineReducers";
import {
  AddExercisePayloadType,
  DeleteExercisePayloadType,
  EditRoutineActionsTypes,
} from "../types/Reducers";

const useEditRoutine = ({ routineId }: { routineId: string }) => {
  const { selectedRoutine } = useRoutines({ selectedRoutineId: routineId });
  const data = selectedRoutine[0];
  const [editRoutineState, dispatch] = useReducer(editRoutineReducers, initialState);

  const setState = () => {
    dispatch({ type: EditRoutineActionsTypes.SETINITIALSTATE, payload: data });
  };

  useEffect(setState, []);

  const handleAddOneExercise = (payload: AddExercisePayloadType) => {
    dispatch({ type: EditRoutineActionsTypes.ADDEXERCISE, payload });
  };

  const handleDeleteOneExercise = (payload: DeleteExercisePayloadType) => {
    dispatch({ type: EditRoutineActionsTypes.DELETEEXERCISE, payload });
  };

  return { editRoutineState, handleAddOneExercise, handleDeleteOneExercise };
};

export default useEditRoutine;
