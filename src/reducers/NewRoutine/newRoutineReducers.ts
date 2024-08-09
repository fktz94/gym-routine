import { monthsOfTheYear, RoutineStructure } from "@/src/types/Routines";

const currentMonth = monthsOfTheYear[new Date().getMonth()];

export const initialState: RoutineStructure = {
  currentDay: 0,
  data: [],
  id: "",
  madeOn: "",
  name: currentMonth,
};

export function newRoutineReducers(
  state: RoutineStructure,
  { type, payload }: NewRoutineActions
): RoutineStructure {
  switch (type) {
    case "setName":
      return { ...state, name: payload };

    default:
      return state;
  }
}
