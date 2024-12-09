import { StyleSheet, Text, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import ThemedButton from "../components/Buttons/ThemedButton";
import useSettingsContext from "../contexts/Settings/useSettingsContext";
import { router } from "expo-router";
import { Colors } from "../constants/Colors";
import { Theme } from "../types/Contexts";
import useHeaderContext from "../contexts/Header/useHeaderContext";
import { useTranslation } from "react-i18next";

const Congratulations = () => {
  const { toggleShowBackArrowButton } = useHeaderContext();
  const { theme } = useSettingsContext();
  const styles = congratulationsStyles(theme);
  const { t } = useTranslation();

  const goHome = () => {
    router.navigate("/");
    toggleShowBackArrowButton(true);
  };

  return (
    <>
      <View style={styles.container}>
        <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
        <View style={styles.textContainer}>
          <Text style={[styles.customText, styles.title]}>
            {t("congratulations")}
          </Text>
          <Text style={styles.customText}>{t("succeeded")}</Text>
          <Text style={styles.customText}>{t("gainedDay")}</Text>
          <Text style={styles.customText}> {t("keepGoing")}</Text>
        </View>
        <ThemedButton
          onPress={goHome}
          externalButtonStyles={styles.buttonContainer}
          externalTextStyles={styles.buttonText}
        >
          {t("backHome")}
        </ThemedButton>
      </View>
    </>
  );
};

export default Congratulations;

const congratulationsStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 100,
      width: "100%",
      gap: 120,
      margin: "auto",
      backgroundColor: Colors[theme].background,
    },
    textContainer: { marginHorizontal: "auto", gap: 40, width: "80%" },
    customText: {
      textAlign: "center",
      color: Colors[theme].text,
      fontSize: 24,
      letterSpacing: 1.5,
    },
    title: { fontWeight: "bold", fontSize: 28 },
    buttonContainer: {
      width: "50%",
      marginHorizontal: "auto",
      paddingVertical: 15,
    },
    buttonText: {
      textAlign: "center",
      letterSpacing: 1,
      fontSize: 16,
      fontWeight: "bold",
    },
  });
