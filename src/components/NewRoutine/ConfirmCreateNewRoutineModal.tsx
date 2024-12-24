import { StyleSheet, Text, View } from "react-native";
import ThemedModal from "../ThemedModal";
import { Colors } from "@/src/constants/Colors";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import useConfirmNewRoutine from "@/src/hooks/useConfirmNewRoutine";
import { ConfirmCreateNewExerciseModalProps } from "@/src/types/Components";
import { Theme } from "@/src/types/Contexts";
import { useTranslation } from "react-i18next";

const ConfirmCreateNewRoutineModal = ({
  closeModal,
}: ConfirmCreateNewExerciseModalProps) => {
  const { theme } = useSettingsContext();
  const styles = confirmCreateNewRoutineModalStyle(theme);
  const { t } = useTranslation();

  const { handleCreateRoutine, isCreatingRoutine } = useConfirmNewRoutine({
    closeModal,
  });

  return (
    <ThemedModal
      closeModal={closeModal}
      handleAccept={handleCreateRoutine}
      isLoading={isCreatingRoutine}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.baseText}>{t("almostDone")}</Text>
        <Text style={[styles.baseText, { fontWeight: "600" }]}>
          {t("confirm")}
        </Text>
        <Text style={[styles.baseText, { fontSize: 14 }]}>
          {t("modifyLater")}
        </Text>
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
