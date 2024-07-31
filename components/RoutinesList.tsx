import { View, Text, FlatList, StyleSheet } from "react-native";
import ThemedButton from "./ThemedButton";
import useThemeContext from "@/contexts/Theme/useThemeContext";
import { RoutinesListProps } from "@/types/Components";
import { Colors } from "@/constants/Colors";
import CurrentThemedButton from "./CurrentThemedButton";

export default function RoutinesList({ selectedRoutines, isCurrent = false }: RoutinesListProps) {
  const { theme } = useThemeContext();
  const styles = routinesListStyles(theme, isCurrent);

  const itemList = (routineName: string, madeOn: string) => (
    <View style={styles.itemList}>
      {isCurrent ? (
        <CurrentThemedButton onPress={() => {}} routineName={routineName} />
      ) : (
        <ThemedButton onPress={() => {}}>{routineName}</ThemedButton>
      )}
      <Text style={styles.madeOnText}>
        Made on <Text style={styles.bold}>{madeOn}</Text>
      </Text>
    </View>
  );

  return (
    <FlatList
      data={selectedRoutines}
      renderItem={({ item: { name, madeOn } }) => itemList(name, madeOn)}
      keyExtractor={({ name }) => name}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const routinesListStyles = (theme: Theme, isCurrent: boolean) =>
  StyleSheet.create({
    bold: { fontWeight: "bold" },
    itemList: { gap: 4, width: "50%", margin: "auto" },
    listButtonText: {
      fontWeight: isCurrent ? "bold" : undefined,
      textAlign: isCurrent ? "center" : undefined,
      fontSize: isCurrent ? 20 : undefined,
      letterSpacing: isCurrent ? 2 : undefined,
    },
    madeOnText: { color: Colors[theme].text, fontSize: 12 },
    separator: { height: 10 },
  });
