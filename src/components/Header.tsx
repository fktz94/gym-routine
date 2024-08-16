import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Colors } from "../constants/Colors";
import { router, usePathname } from "expo-router";
import QuitCreatingNewExerciseModal from "./NewRoutine/QuitCreatingNewExerciseModal";
import { useState } from "react";

export default function Header() {
  // Executes usePathname so the Header components subscribes to global navigation changes.
  const path = usePathname();
  const [showQuitModal, setShowQuitModal] = useState(false);

  const { theme, toggleTheme, showBackArrowButton } = useThemeContext();
  const iconName = theme === "light" ? "moon" : "sunny";

  const canGoBack = router.canGoBack();

  const goBack = () => {
    if (path === "/new-routine" || path.includes("edit-routine")) {
      setShowQuitModal(true);
    } else {
      router.back();
    }
  };

  const acceptQuitModal = () => {
    setShowQuitModal(false);
    router.back();
  };
  const cancelQuitModal = () => {
    setShowQuitModal(false);
  };

  return (
    <>
      {/* THIS MODAL SHOULDN'T BE HERE - IT SHOULD BE ON ITS RESPECTIVE SCREEN */}
      {showQuitModal && (
        <QuitCreatingNewExerciseModal accept={acceptQuitModal} cancel={cancelQuitModal} />
      )}
      {/* THIS MODAL SHOULDN'T BE HERE - IT SHOULD BE ON ITS RESPECTIVE SCREEN */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name={iconName} size={32} color={Colors[theme].text} onPress={toggleTheme} />
          {canGoBack && showBackArrowButton && (
            <Ionicons name="arrow-back" size={32} color={Colors[theme].text} onPress={goBack} />
          )}
        </View>
      </View>
    </>
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
