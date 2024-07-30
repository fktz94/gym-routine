import ThemedButton from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";
import useThemeContext from "@/contexts/Theme/useThemeContext";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { theme } = useThemeContext();
  const styles = indexStyles(theme);

  return (
    <View style={styles.container}>
      <View>
        <ThemedButton onPress={() => {}}>New routine</ThemedButton>
      </View>
      <Text style={styles.title}>List of routines</Text>
      <View>{/* <FlatList></FlatList> */}</View>
    </View>
  );
}

const indexStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      alignItems: "center",
      gap: 16,
    },
    title: { fontWeight: "bold", fontSize: 24, color: Colors[theme].text },
  });
