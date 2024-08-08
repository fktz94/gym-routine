import { StyleSheet, Text, TextInput, View } from "react-native";
import useNewRoutine from "../hooks/useNewRoutine";
import ThemedButton from "../components/ThemedButton";
import useThemeContext from "../contexts/Theme/useThemeContext";
import FirstStep from "../components/NewRoutine/FirstStep";

const NewRoutine = () => {
  const { handleName, handleStep, name, step, days, handleDays } = useNewRoutine();
  const { theme } = useThemeContext();
  const styles = newRoutineStyles(theme);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <FirstStep handleName={handleName} name={name} days={days} handleDays={handleDays} />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputsContainer}>{renderStep()}</View>
      <View style={styles.directionButtonsContainer}>
        <ThemedButton onPress={() => handleStep({ down: true })}>BACK</ThemedButton>
        <ThemedButton onPress={() => handleStep({})}>NEXT</ThemedButton>
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
    },
  });
