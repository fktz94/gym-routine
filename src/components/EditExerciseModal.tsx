import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { EditExerciseModalProps } from "../types/Components";

const EditExerciseModal = ({ isOpen, closeModal, data }: EditExerciseModalProps) => {
  const { theme } = useThemeContext();
  const styles = editExerciseModalStyles(theme);

  const [newValue, setNewValue] = useState(data.weight);

  const handleNewValue = (newVal: number | string) => {
    setNewValue(newVal);
  };

  return (
    <Modal animationType="slide" transparent visible={isOpen}>
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
                Previous:{" "}
              </Text>
              <Text style={[styles.previousWeightText, { fontWeight: "bold" }]}>
                {data.weight} {typeof data.weight === "number" ? "kg" : undefined}
              </Text>
            </View>
          )}
          <TextInput
            style={styles.weightTextInput}
            keyboardType={typeof data.weight === "number" ? "decimal-pad" : undefined}
            placeholder="Insert the new weight"
            onChangeText={handleNewValue}
          />
        </View>
      </View>
    </Modal>
  );
};

export default EditExerciseModal;

const editExerciseModalStyles = (theme: Theme) =>
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
      padding: 20,
      backgroundColor: Colors[theme].background,
      borderRadius: 10,
      gap: 20,
    },
    weightTextInput: {
      color: Colors[theme].text,
      textAlign: "center",
      fontSize: 24,
    },
    previousWeightTextView: {
      flexDirection: "row",
      alignItems: "flex-end",
      borderBottomWidth: 0.5,
      width: "100%",
      paddingRight: 4,
      paddingLeft: 1,
      gap: 2,
    },
    previousWeightText: {
      color: Colors[theme].text,
    },
  });
