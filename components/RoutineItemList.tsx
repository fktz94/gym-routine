import { View, Text, StyleSheet } from "react-native";
import React from "react";
import useThemeContext from "@/contexts/Theme/useThemeContext";
import { Link } from "expo-router";
import CurrentThemedButton from "./CurrentThemedButton";
import ThemedButton from "./ThemedButton";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { RoutinesItemListProps } from "@/types/Components";

export default function RoutineItemList({
  routineName,
  madeOn,
  id,
  isCurrent = false,
}: RoutinesItemListProps) {
  const { theme } = useThemeContext();
  const styles = routinesListStyles(theme);

  return (
    <View style={styles.itemList}>
      <Link href={`/routine/${id}`} asChild>
        {isCurrent ? (
          <CurrentThemedButton routineName={routineName} />
        ) : (
          <ThemedButton>{routineName}</ThemedButton>
        )}
      </Link>
      <Text style={styles.madeOnText}>
        Made on <Text style={styles.bold}>{madeOn}</Text>
      </Text>
    </View>
  );
}

const routinesListStyles = (theme: Theme) =>
  StyleSheet.create({
    bold: { fontWeight: "bold" },
    itemList: { gap: 4, width: "50%", margin: "auto" },
    madeOnText: { color: Colors[theme].text, fontSize: 12 },
  });
