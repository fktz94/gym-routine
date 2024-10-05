import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "./reactReduxHook";
import useRoutineContext from "../contexts/Routine/useRoutineContext";
import { UseEditWeightModal } from "../types/Hooks";
import { ResponseStatus } from "../types/Store";
import { modifyExercise } from "../store/Routines/RoutinesAsyncThunk";
import { resetModifiyExerciseState } from "../store/Routines/RoutinesSlice";
import { validateWeightInputNumber } from "@/src/utils/Validations/Validations";
import { NoWeight } from "../constants/Strings";
import { Weight } from "../types/Routines";

const useEditWeightModal = ({
  closeModal,
  exerciseData,
  exerciseName,
  isCurrent,
  selectedSerie,
}: UseEditWeightModal) => {
  const dispatch = useAppDispatch();

  const {
    isGettingAllRoutines,
    isModifyingRoutines,
    modifyExerciseStatus,
    modifyExerciseErrorMessage,
  } = useAppSelector(({ routines }) => routines);

  const { routineId, selectedDay } = useRoutineContext();

  const newInitialWeight = !exerciseData.weight?.isCustom
    ? exerciseData.weight?.value?.split(" ")[0]
    : exerciseData.weight?.value;

  const initialCL =
    exerciseData.weight?.value &&
    exerciseData.weight?.value?.split(" ")?.findIndex((item) => item === "c/l") !== -1;

  const [newWeightValue, setNewValue] = useState(newInitialWeight);
  const [customValue, setCustomValue] = useState(exerciseData.weight?.isCustom);
  const [settedToCurrent, setSettedToCurrent] = useState(isCurrent);
  const [hasCL, setHasCL] = useState(initialCL);

  const handleCustomCheckbox = (val: boolean) => {
    setNewValue("");
    setHasCL(false);
    setCustomValue(val);
  };

  const handleCurrentCheckbox = (val: boolean) => setSettedToCurrent(val);

  const handleNoWeightCheckbox = (val: boolean) => setNewValue(val ? NoWeight : "");

  const hasNoWeight = newWeightValue === NoWeight;

  const handleNewValue = (input: string) => {
    if (!customValue && validateWeightInputNumber(input)) return;
    setNewValue(input);
  };

  const toggleCL = () => setHasCL(!hasCL);

  const isValueInvalid = exerciseData.weight?.value === newWeightValue || !newWeightValue;
  const isButtonDisabled = isValueInvalid && settedToCurrent === isCurrent;
  const isLoading = isGettingAllRoutines || isModifyingRoutines;
  const hasEndedFetchingModification =
    modifyExerciseStatus === ResponseStatus.REJECTED ||
    modifyExerciseStatus === ResponseStatus.FULFILLED;

  const handleAccept = () => {
    if (!newWeightValue) return;
    const completedValue = !customValue
      ? `${newWeightValue} kg ${hasCL ? "c/l" : ""}`
      : newWeightValue;
    const newValue: Weight = {
      isCustom: !!customValue || newWeightValue === NoWeight,
      value: completedValue,
    };
    const payload = {
      routineId,
      selectedDay,
      exerciseName,
      selectedSerie,
      newWeightValue: newValue,
      makeItCurrent: settedToCurrent && !isCurrent,
    };

    dispatch(modifyExercise(payload));
  };

  useEffect(() => {
    if (isLoading || modifyExerciseStatus === ResponseStatus.IDLE) return;

    if (hasEndedFetchingModification) {
      dispatch(resetModifiyExerciseState());
      closeModal();
    }
    if (modifyExerciseErrorMessage) {
      Alert.alert("Error!", modifyExerciseErrorMessage);
    }
  }, [modifyExerciseStatus, isLoading]);

  return {
    customValue,
    handleAccept,
    handleCustomCheckbox,
    handleCurrentCheckbox,
    handleNewValue,
    handleNoWeightCheckbox,
    hasCL,
    hasNoWeight,
    isButtonDisabled,
    isLoading,
    newWeightValue,
    settedToCurrent,
    toggleCL,
  };
};

export default useEditWeightModal;
