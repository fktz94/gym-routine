import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import useThemeContext from "@/contexts/Theme/useThemeContext";
import { Colors } from "@/constants/Colors";

export default function Header() {
  const { theme, toggleTheme } = useThemeContext();
  const iconName = theme === "light" ? "moon" : "sunny";

  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={32} color={Colors[theme].text} onPress={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingTop: 20,
    backgroundColor: "transparent",
    marginLeft: "auto",
  },
});
