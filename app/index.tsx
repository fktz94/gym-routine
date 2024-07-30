import useThemeContext from "@/contexts/Theme/useThemeContext";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{theme}</Text>
      <Button title="change theme" onPress={toggleTheme} />
    </View>
  );
}
