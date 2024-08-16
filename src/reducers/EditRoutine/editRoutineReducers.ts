import {
  AddExercisePayloadType,
  DeleteExercisePayloadType,
  EditRoutineActions,
  EditRoutineActionsTypes,
} from "@/src/types/Reducers";
import { RoutineDay, RoutineStructure } from "@/src/types/Routines";

export const initialState: RoutineStructure = {
  currentDay: 0,
  data: [],
  id: "",
  madeOn: "",
  name: "",
};

export function editRoutineReducers(
  state: RoutineStructure,
  { type, payload }: EditRoutineActions
): RoutineStructure {
  switch (type) {
    case EditRoutineActionsTypes.SETINITIALSTATE:
      return payload ? { ...payload } : { ...state };
    case EditRoutineActionsTypes.ADDEXERCISE:
      return { ...state, data: findDayAndAddNewExercise(state.data, payload) };
    case EditRoutineActionsTypes.DELETEEXERCISE:
      return { ...state, data: findDayAndDeleteExercise(state.data, payload) };
    default:
      return state;
  }
}

function findDayAndAddNewExercise(
  data: RoutineDay[],
  { dayIndex, exerciseData }: AddExercisePayloadType
) {
  return data.map((routine, index) => (index === dayIndex ? [...routine, exerciseData] : routine));
}

function findDayAndDeleteExercise(
  data: RoutineDay[],
  { dayIndex, exerciseIndex }: DeleteExercisePayloadType
) {
  return data.map((routine, index) =>
    index === dayIndex ? routine.filter((_, i) => i !== exerciseIndex) : routine
  );
}
