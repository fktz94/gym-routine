import { StyleSheet, Text, View } from "react-native";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { QuitCreatingNewExerciseModalProps } from "@/src/types/Components";
import { Colors } from "@/src/constants/Colors";
import ThemedModal from "../ThemedModal";
import { Theme } from "@/src/types/Contexts";

const QuitCreatingNewExerciseModal = ({ accept, cancel }: QuitCreatingNewExerciseModalProps) => {
  const { theme } = useThemeContext();
  const styles = quitCreatingModalStyles(theme);

  return (
    <ThemedModal closeModal={cancel} handleAccept={accept}>
      <View style={styles.innerContainer}>
        <Text style={styles.baseText}>Any changes will be lost.</Text>
        <Text style={styles.baseText}>Procceed?</Text>
      </View>
    </ThemedModal>
  );
};

export default QuitCreatingNewExerciseModal;

const quitCreatingModalStyles = (theme: Theme) =>
  StyleSheet.create({
    innerContainer: {
      margin: "auto",
      gap: 16,
    },
    baseText: {
      color: Colors[theme].text,
      fontSize: 20,
      textAlign: "center",
      letterSpacing: 1,
    },
  });
