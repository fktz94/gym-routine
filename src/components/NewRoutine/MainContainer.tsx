import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ThemedButton from "../ThemedButton";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ConfirmCreateNewExerciseModal from "./ConfirmCreateNewExerciseModal";

const MainContainer = () => {
  const { theme } = useThemeContext();
  const styles = newRoutineStyles(theme);

  const { handleStep, newRoutineState, step } = useNewRoutineContext();
  const { name } = newRoutineState;

  const [isCreating, setIsCreating] = useState(false);

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

  const isFirstStep = step === 0;
  const isLastStep = step === 1;

  const isNextBtnDisabled = isFirstStep && !name;

  const openModal = () => setIsCreating(true);
  const closeModal = () => setIsCreating(false);

  const nextBtnFunction = () => {
    if (isLastStep) {
      openModal();
    } else {
      handleStep({ direction: "up" });
    }
  };

  return (
    <>
      {isCreating && <ConfirmCreateNewExerciseModal closeModal={closeModal} />}
      <View style={styles.mainContainer}>
        <View style={styles.inputsContainer}>{renderStep()}</View>
        <View style={styles.directionButtonsContainer}>
          <ThemedButton disabled={isFirstStep} onPress={() => handleStep({ direction: "down" })}>
            BACK
          </ThemedButton>
          <ThemedButton disabled={isNextBtnDisabled} onPress={nextBtnFunction}>
            {isLastStep ? "FINISH" : "NEXT"}
          </ThemedButton>
        </View>
      </View>
    </>
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
      height: "90%",
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
