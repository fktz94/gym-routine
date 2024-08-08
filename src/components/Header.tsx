import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Colors } from "../constants/Colors";
import { router, usePathname } from "expo-router";

export default function Header() {
  // Executes usePathname so the Header components subscribes to global navigation changes.
  usePathname();

  const { theme, toggleTheme, showBackArrowButton } = useThemeContext();
  const iconName = theme === "light" ? "moon" : "sunny";

  const canGoBack = router.canGoBack();
  const goBack = () => router.back();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name={iconName} size={32} color={Colors[theme].text} onPress={toggleTheme} />
        {canGoBack && showBackArrowButton && (
          <Ionicons name="arrow-back" size={32} color={Colors[theme].text} onPress={goBack} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: "transparent",
    width: "100%",
  },
  header: { flexDirection: "row-reverse", justifyContent: "space-between" },
});
