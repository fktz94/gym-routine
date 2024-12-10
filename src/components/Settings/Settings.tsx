import { Colors } from "@/src/constants/Colors";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { Theme } from "@/src/types/Contexts";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

const Settings = () => {
  const { theme, toggleTheme } = useSettingsContext();
  const styles = settingsStyles(theme);

  const iconName = theme === "light" ? "moon" : "sunny";

  return (
    <View style={styles.container}>
      <View style={styles.itemList}>
        <Text style={styles.itemListText}>Toggle mode</Text>
        <Ionicons
          name={iconName}
          size={32}
          color={Colors[theme].text}
          onPress={toggleTheme}
        />
      </View>
      <View style={styles.itemList}>
        <Text style={styles.itemListText}>Change language</Text>
      </View>
    </View>
  );
};

export default Settings;

const settingsStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
      paddingTop: 60,
      gap: 40,
    },
    itemList: {
      flexDirection: "row",
      marginHorizontal: "auto",
      gap: 100,
      alignItems: "center",
    },
    itemListText: {
      color: Colors[theme].text,
      fontSize: 16,
    },
  });
