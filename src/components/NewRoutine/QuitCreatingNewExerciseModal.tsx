import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AcceptButton, CancelButton } from "../ThemedButton";
import { Ionicons } from "@expo/vector-icons";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { QuitCreatingNewExerciseModalProps } from "@/src/types/Components";
import { Colors } from "@/src/constants/Colors";

const QuitCreatingNewExerciseModal = ({ accept, cancel }: QuitCreatingNewExerciseModalProps) => {
  const { theme } = useThemeContext();
  const styles = quitCreatingModalStyles(theme);

  return (
    <Modal animationType="slide" transparent>
      <View style={styles.container}>
        <Ionicons
          style={styles.closeIconBtn}
          name="close"
          color={Colors[theme].text}
          size={30}
          onPress={cancel}
        />
        <View style={styles.exerciseContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.innerTextContainer}>
              <Text style={styles.baseText}>Any changes will be lost.</Text>
              <Text style={styles.baseText}>Procceed?</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <CancelButton onCancel={cancel} />
              <AcceptButton onAccept={accept} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default QuitCreatingNewExerciseModal;

const quitCreatingModalStyles = (theme: Theme) =>
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
    exerciseContainer: {
      width: "80%",
      padding: 30,
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
    innerContainer: {
      gap: 40,
      paddingVertical: 20,
    },
    innerTextContainer: {
      margin: "auto",
      gap: 16,
    },
    baseText: {
      color: Colors[theme].text,
      fontSize: 20,
      textAlign: "center",
      letterSpacing: 1,
    },
    buttonsContainer: { flexDirection: "row", gap: 20, justifyContent: "center" },
  });
