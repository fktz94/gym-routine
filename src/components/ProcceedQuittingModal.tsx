import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import ThemedModal from "./ThemedModal";
import { Colors } from "@/src/constants/Colors";
import useHeaderContext from "@/src/contexts/Header/useHeaderContext";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { Theme } from "@/src/types/Contexts";
import { useTranslation } from "react-i18next";

const ProcceedQuittingModal = () => {
  const { theme } = useSettingsContext();
  const styles = quitCreatingModalStyles(theme);
  const { t } = useTranslation();

  const { toggleShowQuitModal } = useHeaderContext();

  const accept = () => {
    toggleShowQuitModal(false);
    router.back();
  };
  const cancel = () => {
    toggleShowQuitModal(false);
  };

  return (
    <ThemedModal closeModal={cancel} handleAccept={accept}>
      <View style={styles.innerContainer}>
        <Text style={styles.baseText}>{t("changesLost")}</Text>
        <Text style={[styles.baseText, { fontWeight: "600" }]}>
          {t("procceed")}
        </Text>
      </View>
    </ThemedModal>
  );
};

export default ProcceedQuittingModal;

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
