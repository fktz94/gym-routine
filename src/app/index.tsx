import ThemedButton from "@/src/components/ThemedButton";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import RoutinesList from "@/src/components/RoutinesList";
import RoutineItemList from "@/src/components/RoutineItemList";
import useRoutines from "@/src/hooks/useRoutines";
import { useAppDispatch, useAppSelector } from "../hooks/reactReduxHook";
import { ResponseStatus } from "../types/Store";
import { getAllRoutines } from "../store/Routines/RoutinesAsyncThunk";
import { useEffect } from "react";
import { setIsInitialLoadToFalse } from "../store/Routines/RoutinesSlice";
import { Link } from "expo-router";

export default function Index() {
  const { theme } = useThemeContext();
  const styles = indexStyles(theme);
  const dispatch = useAppDispatch();

  const { getAllRoutinesStatus, isGettingAllRoutines, isInitialLoad } = useAppSelector(
    (state) => state.routines
  );

  const dataIsNotFetchedYet = getAllRoutinesStatus === ResponseStatus.IDLE;

  if (dataIsNotFetchedYet) {
    dispatch(getAllRoutines());
  }

  useEffect(() => {
    // This isInitialLoad logic is because of the whole stored data being fetched again instead having a DB hosted in a server an make proper API calls.
    if (isInitialLoad && !isGettingAllRoutines && !dataIsNotFetchedYet) {
      dispatch(setIsInitialLoadToFalse());
    }
  }, [isInitialLoad, isGettingAllRoutines, dataIsNotFetchedYet]);

  const { currentRoutine, pastRoutines, noRoutines } = useRoutines();

  const currentRoutineButton = () => {
    if (!currentRoutine) return;
    const { id, madeOn, name } = currentRoutine;
    return <RoutineItemList id={id} madeOn={madeOn} routineName={name} isCurrent />;
  };

  const renderLoader = dataIsNotFetchedYet || (isInitialLoad && isGettingAllRoutines);

  return (
    <View style={styles.mainContainer}>
      {renderLoader ? (
        <ActivityIndicator
          size={80}
          color={Colors[theme].secondary}
          style={{ marginVertical: "auto" }}
        />
      ) : (
        <>
          <Link href={`/new-routine`} asChild>
            <ThemedButton isSecondary>New routine</ThemedButton>
          </Link>
          {currentRoutine && (
            <View style={styles.listContainer}>
              <Text style={styles.title}>Current routine</Text>
              {currentRoutineButton()}
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
                It seems you haven't write routines yet.{"\n"}Write the first one and go training!
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
