import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedButton from "./ThemedButton";
import { Colors } from "@/src/constants/Colors";
import { CancelButtonProps } from "@/src/types/Components";

const styles = StyleSheet.create({
  cancelView: { backgroundColor: Colors.cancelBackground },
  cancelText: { color: Colors.dark.text, fontWeight: "bold", letterSpacing: 1 },
});

export const CancelButton = ({ onCancel, isIcon = false, text }: CancelButtonProps) => {
  return (
    <ThemedButton
      externalButtonStyles={styles.cancelView}
      externalTextStyles={styles.cancelText}
      onPress={onCancel}
    >
      {isIcon ? <Ionicons name="close" size={20} /> : text ? text : "Cancel"}
    </ThemedButton>
  );
};
