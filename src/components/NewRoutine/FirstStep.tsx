import { StyleSheet, Text, TextInput, View } from "react-native";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Colors } from "@/src/constants/Colors";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";
import CustomSelectDropdown from "../CustomSelectDropdown";

const FirstStep = () => {
  const { theme } = useThemeContext();
  const styles = firstStepStyles(theme);

  const { handleName, handleDays, newRoutineState, hasWarmUpRoutine, toggleWarmUpRoutine } =
    useNewRoutineContext();

  const { name, data } = newRoutineState;

  const daysDropdownValues = [...Array(7)].map((_, i) => i + 1);

  const defaultValue = daysDropdownValues[data.length - 1];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>First, give it a name.</Text>
        <Text style={styles.subtitle}>(Normally, the month's name)</Text>
        <TextInput value={name} onChangeText={handleName} style={styles.textInput} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Then, select how many days per week will the routine have.</Text>
        <CustomSelectDropdown
          data={daysDropdownValues}
          defaultValue={defaultValue}
          onSelect={handleDays}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxText}>Check if wanna write your everyday warm-up routine.</Text>
        <BouncyCheckbox
          size={26}
          fillColor={Colors.light.primary}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={toggleWarmUpRoutine}
          isChecked={hasWarmUpRoutine}
        />
      </View>
    </View>
  );
};

export default FirstStep;

const firstStepStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      paddingTop: 40,
      flex: 1,
      gap: 80,
      width: "75%",
    },
    container: {
      gap: 25,
    },
    checkboxContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      gap: 60,
    },
    checkboxText: {
      color: Colors[theme].text,
      fontWeight: "bold",
      letterSpacing: 1,
      textAlign: "center",
      paddingHorizontal: 20,
      fontSize: 16,
    },
    title: {
      color: Colors[theme].text,
      fontWeight: "bold",
      letterSpacing: 1,
      textAlign: "center",
      fontSize: 20,
    },
    subtitle: {
      color: Colors[theme].text,
      fontWeight: "bold",
      letterSpacing: 0.5,
      textAlign: "center",
      marginTop: -20,
    },
    textInput: {
      fontSize: 24,
      paddingVertical: 10,
      paddingHorizontal: 20,
      color: Colors[theme].text,
      borderWidth: 1,
      borderColor: Colors[theme].primary,
      textAlign: "center",
    },
  });
