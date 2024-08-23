import { StyleSheet, Text, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useEffect, useRef } from "react";
import ThemedButton from "../components/ThemedButton";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { router } from "expo-router";
import { Colors } from "../constants/Colors";

const Congratulations = () => {
  const { theme, toggleShowBackArrowButton } = useThemeContext();
  const styles = congratulationsStyles(theme);

  const goHome = () => {
    router.navigate("/");
    toggleShowBackArrowButton(true);
  };

  return (
    <>
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.customText, styles.title]}>Congratulations!</Text>
          <Text style={styles.customText}>You've succeedeed on your daily objective!</Text>
          <Text style={styles.customText}>Today's been a gained day</Text>
          <Text style={styles.customText}>Keep going!</Text>
        </View>
        <ThemedButton
          onPress={goHome}
          externalButtonStyles={styles.buttonContainer}
          externalTextStyles={styles.buttonText}
        >
          Back to home
        </ThemedButton>
      </View>
    </>
  );
};

export default Congratulations;

const congratulationsStyles = (theme: Theme) =>
  StyleSheet.create({
    container: { flex: 1, paddingTop: 100, width: "80%", gap: 120, margin: "auto" },
    textContainer: { marginHorizontal: "auto", gap: 40 },
    customText: {
      textAlign: "center",
      color: Colors[theme].text,
      fontSize: 24,
      letterSpacing: 1.5,
    },
    title: { fontWeight: "bold", fontSize: 28 },
    buttonContainer: { width: "50%", marginHorizontal: "auto", paddingVertical: 15 },
    buttonText: { textAlign: "center", letterSpacing: 1, fontSize: 16, fontWeight: "bold" },
  });
