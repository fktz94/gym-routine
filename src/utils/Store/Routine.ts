import { RoutinesData, RoutineStructure } from "@/src/types/Routines";
import {
  AddNewRoutineUtilsProps,
  CreateNewRoutineUtilsProps,
  ModifyOneExerciseUtilsProps,
} from "@/src/types/Utils";
import { produce } from "immer";
import * as Crypto from "expo-crypto";

export const modifyOneExercise = ({
  routines,
  routineId,
  selectedDay,
  exerciseName,
  selectedSerie,
  newWeightValue,
  makeItCurrent,
}: ModifyOneExerciseUtilsProps) => {
  const nextState = produce(routines, (draft) => {
    const selectedExercise = draft
      .find((el) => el.id === routineId)
      ?.data[selectedDay].find((el) => el.name === exerciseName);

    if (!selectedExercise) return;

    selectedExercise.weightsAndRepetitions[selectedSerie].weight = newWeightValue;

    if (makeItCurrent) {
      selectedExercise.current = selectedSerie;
    }
  });

  return nextState;
};

export const addNewRoutine = ({
  prevRoutinesData,
  routineData,
  routineName,
}: AddNewRoutineUtilsProps) => {
  const madeOn = new Date().toDateString().split(" ").slice(1).join(" ");

  const payload: RoutineStructure = {
    currentDay: 0,
    data: routineData,
    id: Crypto.randomUUID(),
    madeOn,
    name: routineName,
  };

  const nextState = produce(prevRoutinesData, (draft: RoutinesData) => {
    draft.currentRoutineName = routineName;
    draft.routines.reverse().push(payload);
    draft.routines.reverse();
  });

  return nextState;
};
