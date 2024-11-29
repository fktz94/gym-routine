import { StyleSheet, View } from "react-native";
import { router, usePathname } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/src/constants/Colors";
import useHeaderContext from "@/src/contexts/Header/useHeaderContext";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Path } from "@/src/types/Utils";
import { Theme } from "../types/Contexts";

export default function Header() {
  const path = usePathname();

  const { theme, toggleTheme } = useThemeContext();
  const iconName = theme === "light" ? "moon" : "sunny";

  const styles = headerStyles(theme);

  const { showBackArrowButton, toggleShowQuitModal, hasUpdatedValues } =
    useHeaderContext();

  const canGoBack = router.canGoBack();

  const goBack = () => {
    if (
      (path === Path.NEWROUTINE || path.includes(Path.EDITROUTINE)) &&
      hasUpdatedValues
    ) {
      toggleShowQuitModal(true);
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name={iconName}
          size={32}
          color={Colors[theme].text}
          onPress={toggleTheme}
        />
        {canGoBack && showBackArrowButton && (
          <Ionicons
            name="arrow-back"
            size={32}
            color={Colors[theme].text}
            onPress={goBack}
          />
        )}
      </View>
    </View>
  );
}

const headerStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 40,
      paddingVertical: 20,
      backgroundColor: Colors[theme].background,
      width: "100%",
    },
    header: { flexDirection: "row-reverse", justifyContent: "space-between" },
  });
