import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

const EditExerciseModal = ({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) => {
  const { theme } = useThemeContext();
  const styles = editExerciseModalStyles(theme);

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
        <Text>modalmodalmodalmodalmodalmodal</Text>
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
      padding: 10,
      color: Colors[theme].background,
    },
    container: { flex: 1, backgroundColor: Colors[theme].modalBackground },
  });
