import ThemedButton from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";
import useThemeContext from "@/contexts/Theme/useThemeContext";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import data from "../data.json";
import { useState } from "react";

export default function Index() {
  const [{ routines, current }] = useState<RoutinesData>(data);

  const currentRoutine = routines.filter((el) => el.name === current);
  const pastRoutines = routines.filter((el) => el.name !== current);

  const { theme } = useThemeContext();
  const styles = indexStyles(theme);

  const itemList = (routineName: string, madeOn: string) => (
    <View style={styles.itemList}>
      <ThemedButton defaultStyle="secondary" externalStyles={styles.listButton} onPress={() => {}}>
        {routineName}
      </ThemedButton>
      <Text style={styles.madeOnText}>
        Made on <Text style={styles.bold}>{madeOn}</Text>
      </Text>
    </View>
  );

  const routinesList = (selectedRoutines: Routine) => {
    return (
      <FlatList
        style={styles.flatListStyle}
        data={selectedRoutines}
        renderItem={({ item: { name, madeOn } }) => itemList(name, madeOn)}
        keyExtractor={({ name }) => name}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ThemedButton onPress={() => {}}>New routine</ThemedButton>
      <View style={styles.listContainer}>
        <Text style={styles.title}>Current routine</Text>
        {routinesList(currentRoutine)}
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.title}>Past routines</Text>
        {routinesList(pastRoutines)}
      </View>
    </View>
  );
}

const indexStyles = (theme: Theme) =>
  StyleSheet.create({
    bold: { fontWeight: "bold" },
    mainContainer: {
      flex: 1,
      flexGrow: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 32,
    },
    flatListStyle: { borderWidth: 1 },
    itemList: { gap: 6, width: "50%", margin: "auto" },
    listButton: {},
    listContainer: {
      gap: 15,
      width: "100%",
    },
    madeOnText: { color: Colors[theme].text, fontSize: 12 },
    separator: { height: 16 },
    title: { fontWeight: "bold", fontSize: 24, color: Colors[theme].text, textAlign: "center" },
  });
