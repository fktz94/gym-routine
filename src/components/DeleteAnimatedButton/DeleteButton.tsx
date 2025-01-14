import { StyleSheet, Text } from "react-native";
import { Colors } from "@/src/constants/Colors";
import { DeleteButtonProps } from "@/src/types/Components";
import { BaseButton } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

const DeleteButton = ({
  onDelete,
  isRoutine,
  isCurrent,
}: DeleteButtonProps) => {
  const styles = deleteButtonStyles(isCurrent);
  const { t } = useTranslation();

  return (
    <BaseButton
      style={{ ...styles.exerciseBtn, ...(isRoutine && styles.routineBtn) }}
      onPress={onDelete}
    >
      <Text style={styles.deleteButtonText}>{t("delete").toUpperCase()}</Text>
    </BaseButton>
  );
};

export default DeleteButton;

const deleteButtonStyles = (isCurrent = false) =>
  StyleSheet.create({
    exerciseBtn: {
      backgroundColor: Colors.cancelBackground,
      justifyContent: "center",
      position: "absolute",
      width: 70,
      height: "100%",
      right: -70,
    },
    routineBtn: {
      height: isCurrent ? "78%" : "71%",
      borderRadius: 11,
    },
    deleteButtonText: {
      textAlign: "center",
      fontSize: 14,
      fontWeight: "bold",
      letterSpacing: 1,
      paddingHorizontal: 2,
      color: Colors.light.background,
    },
  });
