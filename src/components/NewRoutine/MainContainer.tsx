import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedButton from "../ThemedButton";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";

const MainContainer = () => {
  const { theme } = useThemeContext();
  const styles = newRoutineStyles(theme);

  const { handleStep, newRoutineState, step } = useNewRoutineContext();
  const { name } = newRoutineState;

  const renderStep = () => {
    switch (step) {
      case 0: {
        return <FirstStep />;
      }
      case 1:
        return <SecondStep />;

      default:
        return null;
    }
  };

  console.log(name);

  const isBackBtnDisabled = step === 0;
  const isNextBtnDisabled = step === 0 && !name;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputsContainer}>{renderStep()}</View>
      <View style={styles.directionButtonsContainer}>
        <ThemedButton
          disabled={isBackBtnDisabled}
          onPress={() => handleStep({ direction: "down" })}
        >
          BACK
        </ThemedButton>
        <ThemedButton disabled={isNextBtnDisabled} onPress={() => handleStep({ direction: "up" })}>
          NEXT
        </ThemedButton>
      </View>
    </View>
  );
};

export default MainContainer;

const newRoutineStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexGrow: 1,
      alignItems: "center",
      gap: 10,
    },
    inputsContainer: {
      height: "80%",
      width: "100%",
      alignItems: "center",
    },
    directionButtonsContainer: {
      flexDirection: "row",
      width: "75%",
      justifyContent: "center",
      gap: 20,
    },
  });
