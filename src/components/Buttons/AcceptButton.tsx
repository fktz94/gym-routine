import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemedButton from "./ThemedButton";
import { Colors } from "@/src/constants/Colors";
import { AcceptButtonProps } from "@/src/types/Components";
import { useTranslation } from "react-i18next";

export const AcceptButton = ({
  onAccept,
  isDisabled = false,
  viewStyle,
  textStyle,
  isIcon = false,
  text,
}: AcceptButtonProps) => {
  const styles = acceptButtonStyles(isDisabled);
  const { t } = useTranslation();

  return (
    <ThemedButton
      externalButtonStyles={{ ...styles.acceptView, ...viewStyle }}
      externalTextStyles={{ ...styles.acceptText, ...textStyle }}
      onPress={onAccept}
      disabled={isDisabled}
    >
      {isIcon ? (
        <Ionicons name="checkmark" size={20} />
      ) : text ? (
        text
      ) : (
        t("accept")
      )}
    </ThemedButton>
  );
};

const acceptButtonStyles = (isDisabled: boolean) =>
  StyleSheet.create({
    acceptView: {
      backgroundColor: isDisabled ? Colors.light.text : Colors.acceptBackground,
      justifyContent: "center",
    },
    acceptText: {
      color: isDisabled ? Colors.light.secondary : Colors.dark.text,
      fontWeight: "bold",
      letterSpacing: 1,
    },
  });
