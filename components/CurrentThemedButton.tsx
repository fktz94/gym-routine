import { StyleSheet } from "react-native";
import ThemedButton from "./ThemedButton";
import { CurrentThemedButtonProps } from "@/types/Components";

export default function CurrentThemedButton({ routineName, onPress }: CurrentThemedButtonProps) {
  return (
    <ThemedButton externalTextStyles={styles.listButtonText} onPress={onPress}>
      {routineName.toUpperCase()}
    </ThemedButton>
  );
}
const styles = StyleSheet.create({
  listButtonText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    letterSpacing: 2,
    paddingVertical: 5,
  },
});
