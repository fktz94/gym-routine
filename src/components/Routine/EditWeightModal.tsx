import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "@/src/constants/Colors";
import { EditExerciseModalProps } from "@/src/types/Components";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { validateWeightInputNumber } from "@/src/utils/Validations/Validations";
import useRoutineContext from "@/src/contexts/Routine/useRoutineContext";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reactReduxHook";
import { modifyExercise } from "@/src/store/Routines/RoutinesAsyncThunk";
import { ResponseStatus } from "@/src/types/Store";
import { resetModifiyExerciseState } from "@/src/store/Routines/RoutinesSlice";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import ThemedModal from "../ThemedModal";

const EditWeightModal = ({
  closeModal,
  exerciseData,
  isCurrent,
  selectedSerie,
  exerciseName,
}: EditExerciseModalProps) => {
  const [newWeightValue, setNewValue] = useState(exerciseData.weight);
  const [customValue, setCustomValue] = useState(
    Number.isNaN(exerciseData.weight && +exerciseData.weight)
  );
  const [settedToCurrent, setSettedToCurrent] = useState(isCurrent);
  const { theme } = useThemeContext();
  const styles = editExerciseModalStyles(theme, customValue);
  const dispatch = useAppDispatch();

  // create custom hook for all this

  const {
    isGettingAllRoutines,
    isModifyingRoutines,
    modifyExerciseStatus,
    modifyExerciseErrorMessage,
  } = useAppSelector(({ routines }) => routines);

  const { routineId, selectedDay } = useRoutineContext();

  const handleCustomCheckbox = () => {
    setNewValue("");
    setCustomValue(!customValue);
  };

  const handleCurrentCheckbox = () => setSettedToCurrent(!settedToCurrent);

  const handleNewValue = (input: number | string) => {
    const isNotNumber = Number.isNaN(+input);
    const newVal = isNotNumber || input === "" ? input : +input;
    if (!customValue && validateWeightInputNumber(newVal)) return;
    setNewValue(newVal);
  };

  const handleAccept = () => {
    if (!newWeightValue) return;
    const payload = {
      routineId,
      selectedDay,
      exerciseName,
      selectedSerie,
      newWeightValue,
      makeItCurrent: settedToCurrent && !isCurrent,
    };

    dispatch(modifyExercise(payload));
  };

  const isValueInvalid = exerciseData.weight === newWeightValue || !newWeightValue;
  const isButtonDisabled = isValueInvalid && settedToCurrent === isCurrent;

  const isLoading = isGettingAllRoutines || isModifyingRoutines;
  const hasEndedFetchingModification =
    modifyExerciseStatus === ResponseStatus.REJECTED ||
    modifyExerciseStatus === ResponseStatus.FULFILLED;

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

  return (
    <ThemedModal
      closeModal={closeModal}
      handleAccept={handleAccept}
      isAcceptBtnDisabled={isButtonDisabled}
      isLoading={isLoading}
    >
      {exerciseData.weight && (
        <View style={styles.previousWeightTextView}>
          <Text style={[styles.previousWeightText, { fontSize: 10, letterSpacing: 0.5 }]}>
            Current weight:{" "}
          </Text>
          <Text style={[styles.previousWeightText, { fontWeight: "bold" }]}>
            {exerciseData.weight} {typeof exerciseData.weight === "number" ? "kg" : undefined}
          </Text>
        </View>
      )}
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.weightTextInput}
          keyboardType={customValue ? "default" : "decimal-pad"}
          onChangeText={handleNewValue}
          value={newWeightValue?.toString()}
          placeholder={customValue ? '100 kg c/l - 45"- RIR 2' : "12,5"}
          placeholderTextColor={Colors.greyText}
        />
        {!customValue && <Text style={styles.kgText}>kg</Text>}
      </View>
      <View style={styles.customContainer}>
        <Text style={styles.customText}>Customize value</Text>
        <BouncyCheckbox
          size={18}
          fillColor={Colors.light.primary}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={handleCustomCheckbox}
          isChecked={customValue}
        />
      </View>
      {!isCurrent && (
        <View style={styles.customContainer}>
          <Text style={styles.customText}>Set to current week</Text>
          <BouncyCheckbox
            size={18}
            fillColor={Colors.light.primary}
            innerIconStyle={{ borderWidth: 2 }}
            onPress={handleCurrentCheckbox}
            isChecked={settedToCurrent}
          />
        </View>
      )}
    </ThemedModal>
  );
};

export default EditWeightModal;

const editExerciseModalStyles = (theme: Theme, customValue: boolean) =>
  StyleSheet.create({
    textInputContainer: {
      flexDirection: "row",
      gap: 10,
      margin: "auto",
    },
    weightTextInput: {
      color: Colors[theme].text,
      textAlign: "center",
      fontSize: 20,
      borderBottomWidth: 0.9,
      minWidth: customValue ? "70%" : "25%",
      padding: 10,
      borderColor: Colors[theme].text,
    },
    kgText: { color: Colors[theme].text, textAlignVertical: "center", fontSize: 16 },
    previousWeightTextView: {
      flexDirection: "row",
      alignItems: "flex-end",
      borderBottomWidth: 0.5,
      borderColor: Colors[theme].text,
      width: "100%",
      paddingRight: 6,
      paddingLeft: 2,
      paddingBottom: 6,
      gap: 4,
    },
    previousWeightText: {
      color: Colors[theme].text,
    },
    customContainer: { flexDirection: "row", gap: 12, justifyContent: "flex-end" },
    customText: { textAlignVertical: "center", color: Colors[theme].text, fontSize: 12 },
  });
