import {
  AddExercisePayloadType,
  NewRoutineActions,
  NewRoutineActionsTypes,
} from "@/src/types/Reducers";
import { Exercise, monthsOfTheYear, RoutineDay, RoutineStructure } from "@/src/types/Routines";

const currentMonth = monthsOfTheYear[new Date().getMonth()];

export const initialState: RoutineStructure = {
  currentDay: 0,
  data: new Array(3).fill([]),
  id: "",
  madeOn: "",
  name: currentMonth,
};

export function newRoutineReducers(
  state: RoutineStructure,
  { type, payload }: NewRoutineActions
): RoutineStructure {
  switch (type) {
    case NewRoutineActionsTypes.SETNAME:
      return { ...state, name: payload };
    case NewRoutineActionsTypes.SETDAYS:
      return { ...state, data: new Array(payload).fill([]) };
    case NewRoutineActionsTypes.ADDEXERCISE:
      return { ...state, data: findDayAndAddNewExercise(state.data, payload) };
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
