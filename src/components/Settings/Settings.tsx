import { Colors } from "@/src/constants/Colors";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { Theme } from "@/src/types/Contexts";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import React, { View, Text, StyleSheet } from "react-native";
import { Languages } from "@/src/constants/Strings";
import SelectDropdown from "react-native-select-dropdown";
import CustomLoader from "../CustomLoader";

const LanguagesDropdown = () => {
  const { theme, changeLanguage, language, isChangingLanguage } =
    useSettingsContext();
  const styles = settingsStyles(theme);

  const languages = Object.values(Languages);
  const findCode = (code: string) => languages.find((el) => el.code === code);
  const defaultValueByIndex =
    languages.findIndex((el) => el.code === language) ?? 0;

  return (
    <View style={{ flex: 1 }}>
      <SelectDropdown
        data={languages}
        defaultValueByIndex={defaultValueByIndex}
        onSelect={(item) => changeLanguage(findCode(item.code)?.code ?? "en")}
        renderButton={(selectedItem, isOpened) => (
          <View style={[styles.dropdownButtonStyle]}>
            {isChangingLanguage ? (
              <CustomLoader size={21} style={{ margin: "auto" }} />
            ) : (
              <>
                <Text style={[styles.dropdownButtonTxtStyle]}>
                  {selectedItem?.name}
                </Text>
                <Ionicons
                  style={[styles.dropdownButtonArrowStyle]}
                  name={isOpened ? "chevron-up" : "chevron-down"}
                />
              </>
            )}
          </View>
        )}
        renderItem={(el, _, isSelected) => (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && {
                backgroundColor:
                  theme === "light"
                    ? Colors[theme].primary
                    : Colors[theme].text,
              }),
            }}
          >
            <Text
              style={{
                ...styles.dropdownItemTxtStyle,
                ...(isSelected && {
                  color:
                    theme === "light"
                      ? Colors[theme].background
                      : Colors[theme].primary,
                }),
              }}
            >
              {el?.name}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        dropdownStyle={{ ...styles.dropdownMenuStyle }}
      />
    </View>
  );
};

const Settings = () => {
  const { theme, toggleTheme } = useSettingsContext();
  const styles = settingsStyles(theme);
  const { t } = useTranslation();

  const iconName = theme === "light" ? "moon" : "sunny";

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{t("settings")}</Text>
        <View style={styles.itemList}>
          <Text style={[styles.itemListText, styles.itemElement]}>
            {t("toggleMode")}
          </Text>
          <Ionicons
            name={iconName}
            size={32}
            color={Colors[theme].text}
            onPress={toggleTheme}
            style={styles.itemElement}
          />
        </View>
        <View style={styles.itemList}>
          <Text style={[styles.itemListText, styles.itemElement]}>
            {t("changeLanguage")}
          </Text>
          <LanguagesDropdown />
        </View>
      </View>
    </>
  );
};

export default Settings;

const settingsStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
      paddingTop: 20,
    },
    title: {
      marginHorizontal: "auto",
      color: Colors[theme].text,
      fontSize: 28,
      paddingBottom: 40,
    },
    itemList: {
      flexDirection: "row",
      marginHorizontal: "auto",
      alignItems: "center",
      width: "90%",
      justifyContent: "space-between",
      borderTopWidth: 2,
      paddingVertical: 30,
      borderColor: Colors[theme].text,
    },
    itemElement: { flex: 1, textAlign: "center" },
    itemListText: {
      color: Colors[theme].text,
      fontSize: 16,
    },
    dropdownButtonStyle: {
      width: "75%",
      margin: "auto",
      backgroundColor: Colors[theme].secondaryTransparent,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 12,
    },
    dropdownButtonTxtStyle: {
      flexGrow: 1,
      fontSize: 16,
      fontWeight: "500",
      color: Colors[theme].text,
      textAlign: "center",
    },
    dropdownButtonArrowStyle: {
      color: Colors[theme].text,
    },
    dropdownMenuStyle: {
      backgroundColor: Colors[theme].secondary,
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: "100%",
      flexDirection: "row",
      paddingHorizontal: 12,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: "500",
      color: Colors[theme].text,
    },
  });
