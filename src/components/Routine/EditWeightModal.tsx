import { StyleSheet, Text, TextInput, View } from "react-native";
import CheckboxContainer from "./CheckboxContainer";
import ThemedModal from "../ThemedModal";
import { Colors } from "@/src/constants/Colors";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import useEditWeightModal from "@/src/hooks/useEditWeightModal";
import { EditExerciseModalProps } from "@/src/types/Components";
import { Theme } from "@/src/types/Contexts";
import { Strings } from "@/src/constants/Strings";
import { BaseButton } from "react-native-gesture-handler";

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
    hasCL,
    hasNoWeight,
    isButtonDisabled,
    isLoading,
    newWeightValue,
    settedToCurrent,
    toggleCL,
  } = useEditWeightModal({
    exerciseData,
    isCurrent,
    selectedSerie,
    exerciseName,
  });

  const { theme } = useSettingsContext();
  const styles = editExerciseModalStyles(theme, !!customValue, !!hasCL);

  return (
    <ThemedModal
      closeModal={closeModal}
      handleAccept={handleAccept}
      isAcceptBtnDisabled={isButtonDisabled}
      isLoading={isLoading}
    >
      {exerciseData.weight?.value &&
        !exerciseData.weight.value.includes(Strings.NoWeight) && (
          <View style={styles.previousWeightTextView}>
            <Text
              style={[
                styles.previousWeightText,
                { fontSize: 10, letterSpacing: 0.5 },
              ]}
            >
              Current weight:{" "}
            </Text>
            <Text style={[styles.previousWeightText, { fontWeight: "bold" }]}>
              {exerciseData.weight.value}
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
              placeholder={customValue ? 'Failure - 45"- RIR 2' : "12,5"}
              placeholderTextColor={Colors.greyText}
            />
            {!customValue && (
              <>
                <Text style={styles.kgText}>kg</Text>
                <View style={styles.eachSideContainer}>
                  <BaseButton style={styles.eachSideBtn} onPress={toggleCL}>
                    <Text style={styles.eachSideText}>{Strings.EachSide}</Text>
                  </BaseButton>
                </View>
              </>
            )}
          </View>
          <CheckboxContainer
            isChecked={!!customValue}
            onPress={handleCustomCheckbox}
            text="Customize value"
          />
        </>
      )}
      {!hasMultipleRepetitions && (
        <CheckboxContainer
          isChecked={hasNoWeight ?? false}
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

const editExerciseModalStyles = (
  theme: Theme,
  customValue: boolean,
  hasCL: boolean
) =>
  StyleSheet.create({
    textInputContainer: {
      flexDirection: "row",
      gap: 10,
      alignSelf: "flex-end",
      marginRight: 14,
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
    kgText: {
      color: Colors[theme].text,
      textAlignVertical: "center",
      fontSize: 16,
    },
    eachSideContainer: {
      justifyContent: "center",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: hasCL ? "transparent" : Colors.greyText,
      backgroundColor: hasCL ? Colors.greyText : "transparent",
    },
    eachSideBtn: {
      justifyContent: "center",
      borderRadius: 10,
      paddingHorizontal: 8,
      flex: 1,
    },
    eachSideText: {
      color: Colors[theme].text,
      opacity: !hasCL ? 0.5 : 1,
    },
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
