import ThemedButton from "@/src/components/ThemedButton";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { StyleSheet, Text, View } from "react-native";
import RoutinesList from "@/src/components/RoutinesList";
import useRoutines from "@/src/hooks/useRoutines";
import { Link } from "expo-router";
import CustomLoader from "../components/CustomLoader";
import CurrentRoutineButton from "../components/Index/CurrentRoutineButton";
import { Theme } from "../types/Contexts";
import useIndex from "../hooks/useIndex";

export default function Index() {
  const { theme } = useThemeContext();
  const styles = indexStyles(theme);

  const { currentRoutine, pastRoutines, noRoutines } = useRoutines();

  const { renderLoader } = useIndex();

  return (
    <View style={styles.mainContainer}>
      {renderLoader ? (
        <CustomLoader style={{ marginVertical: "auto" }} />
      ) : (
        <>
          <Link href={`/new-routine`} asChild>
            <ThemedButton isSecondary>New routine</ThemedButton>
          </Link>
          {currentRoutine && (
            <View style={styles.listContainer}>
              <Text style={styles.title}>Current routine</Text>
              <CurrentRoutineButton currentRoutine={currentRoutine} />
            </View>
          )}
          {pastRoutines.length > 0 && (
            <View style={styles.listContainer}>
              <Text style={styles.title}>Past routines</Text>
              <RoutinesList selectedRoutines={pastRoutines} />
            </View>
          )}
          {noRoutines && (
            <View style={styles.listContainer}>
              <Text style={[styles.title, styles.noRoutines]}>
                It seems you haven't wrote any routine yet.{"\n\n"}Go ahead and start training!
              </Text>
            </View>
          )}
        </>
      )}
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
    noRoutines: { letterSpacing: 2, padding: 60, lineHeight: 35 },
  });
