import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import NewDayItem from "./NewDayItem";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";

const SecondStep = () => {
  const { theme } = useThemeContext();
  const styles = secondStepStyles(theme);

  const { newRoutineState } = useNewRoutineContext();
  const { data } = newRoutineState;

  const renderDays = () => data.map((_, i) => <NewDayItem key={i} dayIndex={i} />);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Now, let's start filling each day with its exercises.</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>{renderDays()}</ScrollView>
    </View>
  );
};

export default SecondStep;

const secondStepStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      paddingTop: 40,
      flex: 1,
      flexGrow: 1,
      gap: 40,
      width: "100%",
    },
    container: {
      gap: 40,
      width: "75%",
      margin: "auto",
    },
    scrollViewContainer: { gap: 40, width: "100%" },
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
  });
