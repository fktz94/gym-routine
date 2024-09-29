import { StyleSheet, Text, TextInput, View } from "react-native";
import CheckboxContainer from "./CheckboxContainer";
import ThemedModal from "../ThemedModal";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import useEditWeightModal from "@/src/hooks/useEditWeightModal";
import { EditExerciseModalProps } from "@/src/types/Components";
import { Theme } from "@/src/types/Contexts";
import { NoWeight } from "@/src/constants/Strings";

const EditWeightModal = ({
  closeModal,
  exerciseData,
  isCurrent,
  selectedSerie,
  exerciseName,
  hasMultipleRepetitions,
}: EditExerciseModalProps) => {
  const {
    customValue,
    handleAccept,
    handleCustomCheckbox,
    handleCurrentCheckbox,
    handleNewValue,
    handleNoWeightCheckbox,
    hasNoWeight,
    isButtonDisabled,
    isLoading,
    newWeightValue,
    settedToCurrent,
  } = useEditWeightModal({
    exerciseData,
    isCurrent,
    selectedSerie,
    exerciseName,
    closeModal,
  });

  const { theme } = useThemeContext();
  const styles = editExerciseModalStyles(theme, customValue);

  return (
    <ThemedModal
      closeModal={closeModal}
      handleAccept={handleAccept}
      isAcceptBtnDisabled={isButtonDisabled}
      isLoading={isLoading}
    >
      {exerciseData.weight && exerciseData.weight !== NoWeight && (
        <View style={styles.previousWeightTextView}>
          <Text style={[styles.previousWeightText, { fontSize: 10, letterSpacing: 0.5 }]}>
            Current weight:{" "}
          </Text>
          <Text style={[styles.previousWeightText, { fontWeight: "bold" }]}>
            {exerciseData.weight} {!isNaN(+exerciseData.weight) ? "kg" : undefined}
          </Text>
        </View>
      )}
      {!hasNoWeight && (
        <>
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
          <CheckboxContainer
            isChecked={customValue}
            onPress={handleCustomCheckbox}
            text="Customize value"
          />
        </>
      )}
      {!hasMultipleRepetitions && (
        <CheckboxContainer
          isChecked={hasNoWeight}
          onPress={handleNoWeightCheckbox}
          text="Exercise without weight"
        />
      )}
      {!isCurrent && (
        <CheckboxContainer
          isChecked={settedToCurrent}
          onPress={handleCurrentCheckbox}
          text="Set to current week"
        />
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
  });
