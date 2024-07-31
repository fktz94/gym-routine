import ThemedButton from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";
import useThemeContext from "@/contexts/Theme/useThemeContext";
import { FlatList, StyleSheet, Text, View } from "react-native";
import data from "../data.json";
import { useState } from "react";

export default function Index() {
  const { theme } = useThemeContext();
  const styles = indexStyles(theme);

  const [routines, setRoutines] = useState(data);

  const itemList = (routineName: string) => {
    const routineDate = routines[routineName].madeOn;
    return (
      <View>
        <ThemedButton
          defaultStyle="secondary"
          externalStyles={styles.listButton}
          onPress={() => {}}
        >
          {routineName}
        </ThemedButton>
        <Text>Made on {routineDate}</Text>
      </View>
    );
  };

  console.log(new Date().toDateString().split(" ").slice(1));

  const routinesList = () => {
    const routinesNames = Object.keys(routines);
    return (
      <FlatList
        data={routinesNames}
        renderItem={({ item }) => itemList(item)}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ThemedButton onPress={() => {}}>New routine</ThemedButton>
      <Text style={styles.title}>Your routines</Text>
      <View style={styles.listContainer}>{routinesList()}</View>
    </View>
  );
}

const indexStyles = (theme: Theme) =>
  StyleSheet.create({
    listButton: {},
    listDateText: {},
    container: {
      flex: 1,
      flexGrow: 1,
      alignItems: "center",
      gap: 16,
    },
    listContainer: {
      flex: 1,
      width: "50%",
    },
    separator: { height: 16 },
    title: { fontWeight: "bold", fontSize: 24, color: Colors[theme].text },
  });
