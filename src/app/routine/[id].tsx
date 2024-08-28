import CustomLoader from "@/src/components/CustomLoader";
import RoutineDetails from "@/src/components/RoutineDetails";
import ThemedButton from "@/src/components/Buttons/ThemedButton";
import { Colors } from "@/src/constants/Colors";
import useHeaderContext from "@/src/contexts/Header/useHeaderContext";
import RoutineProvider from "@/src/contexts/Routine/RoutineProvider";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reactReduxHook";
import useRoutineDescription from "@/src/hooks/useRoutineDescription";
import { concludeRoutineDay } from "@/src/store/Routines/RoutinesAsyncThunk";
import { resetConcludeExerciseState } from "@/src/store/Routines/RoutinesSlice";
import { Theme } from "@/src/types/Contexts";
import { ResponseStatus } from "@/src/types/Store";
import { useIsFocused } from "@react-navigation/native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { AcceptButton } from "@/src/components/Buttons/AcceptButton";

export default function RoutineScreen() {
  const { toggleShowBackArrowButton } = useHeaderContext();
  const { theme } = useThemeContext();
  const styles = routineDescriptionStyles(theme);

  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    isGettingAllRoutines,
    concludeExerciseStatus,
    isConcludingExerciseRoutine,
    concludeExerciseErrorMessage,
  } = useAppSelector(({ routines }) => routines);
  const { routine, selectedDay, handleSelectedDay } = useRoutineDescription({ id });

  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();

  const daysButtons = () =>
    routine?.data.map((_, i) => (
      <ThemedButton
        externalButtonStyles={styles.dayButtonView}
        externalTextStyles={{
          ...styles.dayButtonText,
          fontWeight: selectedDay === i ? "bold" : undefined,
        }}
        isSecondary={selectedDay === i}
        key={i}
        onPress={() => handleSelectedDay(i)}
      >
        Day {i + 1}
      </ThemedButton>
    ));

  const day = routine?.data[selectedDay];
  const isDayEmpty = !day || day?.length === 0;

  const emptyDayText = () => (
    <View style={styles.emptyDayContainer}>
      <Text style={styles.emptyDayText}>This day is empty!</Text>
      <Link href={{ pathname: `/edit-routine/[id]`, params: { id, selectedDay } }} asChild>
        <ThemedButton
          externalButtonStyles={styles.emptyDayBtnContainer}
          externalTextStyles={styles.emptyDayBtnText}
        >
          Fill it
        </ThemedButton>
      </Link>
    </View>
  );

  if (!routine) return null; // Should redirect to 404 page?

  const isLoading = (isFocused && isGettingAllRoutines) || isConcludingExerciseRoutine;

  useEffect(() => {
    if (isConcludingExerciseRoutine) return;

    if (concludeExerciseStatus === ResponseStatus.FULFILLED) {
      router.navigate("/congratulations");
      dispatch(resetConcludeExerciseState());
      toggleShowBackArrowButton(false);
    }

    if (concludeExerciseErrorMessage) {
      Alert.alert("Error!", concludeExerciseErrorMessage);
      dispatch(resetConcludeExerciseState());
    }
  }, [concludeExerciseStatus, isConcludingExerciseRoutine]);

  const handleRoutineDone = () => {
    dispatch(concludeRoutineDay({ dayIndex: selectedDay, routineId: id }));
  };

  return (
    <RoutineProvider routine={routine} selectedDay={selectedDay}>
      <View style={styles.container}>
        <Text style={styles.routineName}>{routine?.name}</Text>
        <View style={styles.daysButtonsContainer}>{daysButtons()}</View>
        {isLoading ? (
          <CustomLoader style={{ marginTop: 100 }} />
        ) : isDayEmpty ? (
          emptyDayText()
        ) : (
          <View style={styles.routineContainer}>
            <RoutineDetails routineDay={routine?.data[selectedDay]} />
            <View style={styles.buttonsContainer}>
              <Link href={{ pathname: `/edit-routine/[id]`, params: { id, selectedDay } }} asChild>
                <ThemedButton externalTextStyles={styles.modifyRoutineBtnText}>
                  Modify routine
                </ThemedButton>
              </Link>
              <AcceptButton
                textStyle={styles.modifyRoutineBtnText}
                onAccept={handleRoutineDone}
                text="Routine done!"
              />
            </View>
          </View>
        )}
      </View>
    </RoutineProvider>
  );
}

const routineDescriptionStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 12,
    },
    daysButtonsContainer: {
      paddingVertical: 16,
      paddingHorizontal: 40,
      flexDirection: "row",
      justifyContent: "space-evenly",
      gap: 6,
      flexWrap: "wrap",
    },
    dayButtonView: { flexGrow: 1, maxWidth: 100 },
    dayButtonText: { textAlign: "center" },
    emptyDayContainer: {
      width: "80%",
      marginHorizontal: "auto",
      gap: 20,
    },
    emptyDayText: {
      fontWeight: "bold",
      fontSize: 26,
      color: Colors[theme].text,
      textAlign: "center",
      paddingTop: 32,
      lineHeight: 64,
    },
    emptyDayBtnContainer: { width: "50%", margin: "auto" },
    emptyDayBtnText: { fontSize: 18, letterSpacing: 2, fontWeight: "bold", textAlign: "center" },
    routineContainer: { flex: 1 },
    routineName: {
      fontWeight: "bold",
      fontSize: 32,
      color: Colors[theme].text,
      textAlign: "center",
    },
    buttonsContainer: {
      flexDirection: "row",
      marginTop: 15,
      marginBottom: 30,
      margin: "auto",
      gap: 40,
    },
    modifyRoutineBtnText: {
      fontSize: 14,
      letterSpacing: 2,
      fontWeight: "bold",
      textAlign: "center",
      paddingVertical: 6,
    },
  });
