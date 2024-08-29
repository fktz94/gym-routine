import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import ThemedModal from "./ThemedModal";
import { Colors } from "@/src/constants/Colors";
import useHeaderContext from "@/src/contexts/Header/useHeaderContext";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Theme } from "@/src/types/Contexts";

const ProcceedQuittingModal = () => {
  const { theme } = useThemeContext();
  const styles = quitCreatingModalStyles(theme);

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
        <Text style={styles.baseText}>Any changes will be lost.</Text>
        <Text style={styles.baseText}>Procceed?</Text>
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
