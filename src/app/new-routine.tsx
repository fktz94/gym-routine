import { StyleSheet, View } from "react-native";
import useNewRoutine from "@/src/hooks/useNewRoutine";
import ThemedButton from "@/src/components/ThemedButton";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import FirstStep from "@/src/components/NewRoutine/FirstStep";
import SecondStep from "@/src/components/NewRoutine/SecondStep";

const NewRoutine = () => {
  const { theme } = useThemeContext();
  const styles = newRoutineStyles(theme);

  const { handleName, handleStep, name, step, days, handleDays } = useNewRoutine();

  const renderStep = () => {
    switch (step) {
      case 0: {
        return (
          <FirstStep handleName={handleName} name={name} days={days} handleDays={handleDays} />
        );
      }
      case 1:
        return <SecondStep />;

      default:
        return null;
    }
  };

  const isBackBtnDisabled = step === 0;
  const isNextBtnDisabled = step === 0 && !name;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputsContainer}>{renderStep()}</View>
      <View style={styles.directionButtonsContainer}>
        <ThemedButton disabled={isBackBtnDisabled} onPress={() => handleStep({ down: true })}>
          BACK
        </ThemedButton>
        <ThemedButton disabled={isNextBtnDisabled} onPress={() => handleStep({})}>
          NEXT
        </ThemedButton>
      </View>
    </View>
  );
};

export default NewRoutine;

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
      width: "75%",
    },
    directionButtonsContainer: {
      flexDirection: "row",
      width: "75%",
      justifyContent: "center",
      gap: 20,
    },
  });
