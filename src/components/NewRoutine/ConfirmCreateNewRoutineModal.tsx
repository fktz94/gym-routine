import { StyleSheet, Text, View } from "react-native";
import ThemedModal from "../ThemedModal";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import useConfirmNewRoutine from "@/src/hooks/useConfirmNewRoutine";
import { ConfirmCreateNewExerciseModalProps } from "@/src/types/Components";
import { Theme } from "@/src/types/Contexts";

const ConfirmCreateNewRoutineModal = ({ closeModal }: ConfirmCreateNewExerciseModalProps) => {
  const { theme } = useThemeContext();
  const styles = confirmCreateNewRoutineModalStyle(theme);
  const { handleCreateRoutine, isCreatingRoutine } = useConfirmNewRoutine({ closeModal });

  return (
    <ThemedModal
      closeModal={closeModal}
      handleAccept={handleCreateRoutine}
      isLoading={isCreatingRoutine}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.baseText}>Great! You're almost done!</Text>
        <Text style={styles.baseText}>Confirm?</Text>
        <Text style={[styles.baseText, { fontSize: 14 }]}>(You can modify it later anyway)</Text>
      </View>
    </ThemedModal>
  );
};

export default ConfirmCreateNewRoutineModal;

const confirmCreateNewRoutineModalStyle = (theme: Theme) =>
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
