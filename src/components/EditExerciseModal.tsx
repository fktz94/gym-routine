import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { EditExerciseModalProps } from "../types/Components";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AcceptButton, CancelButton } from "./ThemedButton";

const EditExerciseModal = ({ closeModal, data, isCurrent, index }: EditExerciseModalProps) => {
  const [newValue, setNewValue] = useState(data.weight);
  const [customValue, setCustomValue] = useState(Number.isNaN(+data.weight));
  const [settedToCurrent, setSettedToCurrent] = useState(isCurrent);

  const { theme } = useThemeContext();
  const styles = editExerciseModalStyles(theme, customValue);

  const handleCustomCheckbox = () => {
    setNewValue("");
    setCustomValue(!customValue);
  };

  const handleCurrentCheckbox = () => setSettedToCurrent(!settedToCurrent);

  const handleNewValue = (input: number | string) => {
    const isNotNumber = Number.isNaN(+input);
    const newVal = isNotNumber || input === "" ? input : +input;
    setNewValue(newVal);
  };

  const handleAccept = () => {
    closeModal();
    console.log(index);

    // change the global state and change the local storage data
  };

  const isValueInvalid = data.weight === newValue || !newValue;
  const isButtonDisabled = isValueInvalid && settedToCurrent === isCurrent;

  return (
    <Modal animationType="slide" transparent visible>
      <View style={styles.container}>
        <Ionicons
          style={styles.closeIconBtn}
          name="close"
          color={Colors[theme].text}
          size={30}
          onPress={closeModal}
        />
        <View style={styles.inputContainer}>
          {data.weight && (
            <View style={styles.previousWeightTextView}>
              <Text style={[styles.previousWeightText, { fontSize: 10, letterSpacing: 0.5 }]}>
                Current weight:{" "}
              </Text>
              <Text style={[styles.previousWeightText, { fontWeight: "bold" }]}>
                {data.weight} {typeof data.weight === "number" ? "kg" : undefined}
              </Text>
            </View>
          )}
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.weightTextInput}
              keyboardType={customValue ? "default" : "decimal-pad"}
              onChangeText={handleNewValue}
              value={newValue?.toString()}
              placeholder={customValue ? '100 kg c/l - 45" - fallo' : "12,5"}
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
              <Text style={styles.customText}>Set to current week?</Text>
              <BouncyCheckbox
                size={18}
                fillColor={Colors.light.primary}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={handleCurrentCheckbox}
                // isChecked={customValue}
              />
            </View>
          )}
          <View style={styles.buttonsContainer}>
            <CancelButton onCancel={closeModal} />
            <AcceptButton onAccept={handleAccept} isDisabled={isButtonDisabled} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditExerciseModal;

const editExerciseModalStyles = (theme: Theme, customValue: boolean) =>
  StyleSheet.create({
    closeIconBtn: {
      position: "absolute",
      right: 0,
      top: 0,
      padding: 10,
      color: Colors[theme].background,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors[theme].modalBackground,
    },
    inputContainer: {
      minWidth: "75%",
      maxWidth: "90%",
      padding: 20,
      backgroundColor: Colors[theme].background,
      borderRadius: 10,
      gap: 40,
      elevation: 1,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
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
    buttonsContainer: { flexDirection: "row", gap: 20, justifyContent: "center" },
  });
