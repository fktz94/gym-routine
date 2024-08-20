import { Routine, RoutinesData, RoutineStructure } from "@/src/types/Routines";
import {
  AddNewRoutineUtilsProps,
  DeleteRoutineUtilsProps,
  EditRoutineUtilsProps,
  ModifyOneExerciseUtilsProps,
} from "@/src/types/Utils";
import { isDraft, produce } from "immer";
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
  const routineId = Crypto.randomUUID();
  const payload: RoutineStructure = {
    currentDay: 0,
    data: routineData,
    id: routineId,
    madeOn,
    name: routineName,
  };

  const nextState = produce(prevRoutinesData, (draft: RoutinesData) => {
    draft.currentRoutineId = routineId;
    draft.routines.reverse().push(payload);
    draft.routines.reverse();
  });

  return nextState;
};

export const editOldRoutine = ({ routineData, prevRoutinesData }: EditRoutineUtilsProps) => {
  const nextState = produce(prevRoutinesData, (draft: Routine) => {
    const routineIndex = draft.findIndex((el) => el.id === routineData.id);
    draft[routineIndex] = routineData;
  });
  return nextState;
};

export const deleteSelectedRoutine = ({ routineId, prevRoutinesData }: DeleteRoutineUtilsProps) => {
  const nextState = produce(prevRoutinesData, (draft: Routine) =>
    draft.filter((el) => el.id !== routineId)
  );
  return nextState;
};
