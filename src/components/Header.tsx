import { StyleSheet, View } from "react-native";
import { router, usePathname } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/src/constants/Colors";
import useHeaderContext from "@/src/contexts/Header/useHeaderContext";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { Path } from "@/src/types/Utils";
import { Theme } from "../types/Contexts";

export default function Header() {
  const path = usePathname();

  const { theme, toggleTheme } = useSettingsContext();

  const styles = headerStyles(theme);

  const { showBackArrowButton, toggleShowQuitModal, hasUpdatedValues } =
    useHeaderContext();

  const canGoBack = router.canGoBack();
  const showSettingsIcon = path !== Path.SETTINGS;

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

  const navigateToSettings = () => router.push(Path.SETTINGS);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {canGoBack && showBackArrowButton && (
          <Ionicons
            name="arrow-back"
            size={32}
            color={Colors[theme].text}
            onPress={goBack}
            style={{ marginRight: "auto" }}
          />
        )}
        {showSettingsIcon && (
          <Ionicons
            name="ellipsis-vertical"
            size={32}
            color={Colors[theme].text}
            onPress={navigateToSettings}
            style={{ marginLeft: "auto" }}
          />
        )}
      </View>
    </View>
  );
}

const headerStyles = (theme: Theme, showSettingsIcon: boolean) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 40,
      paddingVertical: 20,
      backgroundColor: Colors[theme].background,
      width: "100%",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
