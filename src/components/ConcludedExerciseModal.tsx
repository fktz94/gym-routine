import { Modal, StyleSheet, Text, View } from "react-native";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { CancelButton } from "./ThemedButton";

const ConcludedExerciseModal = ({ closeModal }: { closeModal: () => void }) => {
  const { theme } = useThemeContext();
  const styles = editExerciseModalStyles(theme);

  return (
    <Modal animationType="slide" transparent>
      <View style={styles.container}>
        <Ionicons
          style={styles.closeIconBtn}
          name="close"
          color={Colors[theme].text}
          size={30}
          onPress={closeModal}
        />
      </View>
    </Modal>
  );
};

export default ConcludedExerciseModal;

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
    innerContainer: {
      width: "75%",
      backgroundColor: Colors[theme].background,
      padding: 40,
      borderRadius: 10,
      gap: 40,
    },
    textContainer: {
      gap: 20,
    },
    title: { fontWeight: "bold", fontSize: 26, paddingBottom: 10 },
    customText: { textAlign: "center", color: Colors[theme].text, fontSize: 20, letterSpacing: 1 },
    buttonsContainer: { flexDirection: "row", gap: 20, justifyContent: "center" },
  });
