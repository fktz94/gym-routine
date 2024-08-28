import { forwardRef } from "react";
import { StyleSheet } from "react-native";
import ThemedButton from "./ThemedButton";
import { CurrentThemedButtonProps } from "@/src/types/Components";

const CurrentThemedButton = forwardRef(({ routineName, onPress }: CurrentThemedButtonProps, _) => {
  return (
    <ThemedButton externalTextStyles={styles.listButtonText} onPress={onPress}>
      {routineName.toUpperCase()}
    </ThemedButton>
  );
});

export default CurrentThemedButton;

const styles = StyleSheet.create({
  listButtonText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    letterSpacing: 2,
    paddingVertical: 5,
  },
});
