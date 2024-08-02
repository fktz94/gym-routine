import ThemedButton from "@/src/components/ThemedButton";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { StyleSheet, Text, View } from "react-native";
import RoutinesList from "@/src/components/RoutinesList";
import { useAppSelector } from "@/src/hooks/reactReduxHook";
import RoutineItemList from "@/src/components/RoutineItemList";

export default function Index() {
  const { theme } = useThemeContext();
  const styles = indexStyles(theme);

  const { currentRoutineName, currentRoutineData, routines } = useAppSelector(
    ({ routines }) => routines
  );

  const pastRoutines = routines.filter((el) => el.name !== currentRoutineName);

  const currentRoutineButton = () => {
    const { id, madeOn, name } = currentRoutineData;
    return <RoutineItemList id={id} madeOn={madeOn} routineName={name} isCurrent />;
  };

  return (
    <View style={styles.mainContainer}>
      <ThemedButton isSecondary onPress={() => {}}>
        New routine
      </ThemedButton>
      <View style={styles.listContainer}>
        <Text style={styles.title}>Current routine</Text>
        {currentRoutineButton()}
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.title}>Past routines</Text>
        <RoutinesList selectedRoutines={pastRoutines} />
      </View>
    </View>
  );
}

const indexStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexGrow: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 32,
    },
    listContainer: {
      gap: 15,
      width: "100%",
    },
    title: { fontWeight: "bold", fontSize: 24, color: Colors[theme].text, textAlign: "center" },
  });
