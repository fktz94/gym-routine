import {
  AddExercisePayloadType,
  DeleteExercisePayloadType,
  EditExercisePayloadType,
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
  warmUp: [],
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
    case NewRoutineActionsTypes.ADDWARMUPEXERCISE:
      return { ...state, warmUp: [...state.warmUp, payload.exerciseData] };
    case NewRoutineActionsTypes.EDITEXERCISE:
      return { ...state, data: findDayAndEditExercise(state.data, payload) };
    case NewRoutineActionsTypes.EDITWARMUPEXERCISE:
      return { ...state, warmUp: findAndEditWarmUpExercise(state.warmUp, payload) };
    case NewRoutineActionsTypes.DELETEEXERCISE:
      return { ...state, data: findDayAndDeleteExercise(state.data, payload) };
    case NewRoutineActionsTypes.DELETEWARMUPEXERCISE:
      return { ...state, warmUp: findAndDeleteWarmUpExercise(state.warmUp, payload) };
    case NewRoutineActionsTypes.CLEANWARMUP:
      return { ...state, warmUp: [] };
    default:
      return state;
  }
}

function findAndDeleteWarmUpExercise(
  warmUp: RoutineDay,
  { exerciseIndex }: { exerciseIndex: number }
) {
  return warmUp.filter((_, i) => i !== exerciseIndex);
}

function findAndEditWarmUpExercise(
  warmUp: RoutineDay,
  { exerciseData, prevName }: { exerciseData: Exercise; prevName: string }
) {
  return warmUp.map((exercise) => (exercise.name === prevName ? exerciseData : exercise));
}

function findDayAndAddNewExercise(
  data: RoutineDay[],
  { dayIndex, exerciseData }: AddExercisePayloadType
) {
  return data.map((routine, index) => (index === dayIndex ? [...routine, exerciseData] : routine));
}

function findDayAndEditExercise(
  data: RoutineDay[],
  { dayIndex, exerciseData, prevName }: EditExercisePayloadType
) {
  return data.map((routine, index) =>
    index === dayIndex
      ? routine.map((exercise) => (exercise.name === prevName ? exerciseData : exercise))
      : routine
  );
}
function findDayAndDeleteExercise(
  data: RoutineDay[],
  { dayIndex, exerciseIndex }: DeleteExercisePayloadType
) {
  return data.map((routine, index) =>
    index === dayIndex ? routine.filter((_, i) => i !== exerciseIndex) : routine
  );
}
