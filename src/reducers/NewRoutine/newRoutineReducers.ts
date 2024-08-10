import { NewRoutineActions, NewRoutineActionsTypes } from "@/src/types/Reducers";
import { monthsOfTheYear, RoutineDay, RoutineStructure } from "@/src/types/Routines";

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
      return { ...state };
    default:
      return state;
  }
}

function findDayAndAddNewExercise(data: RoutineDay[], newExercise) {}
