import { StyleSheet, Text, View } from "react-native";
import { BaseButton } from "react-native-gesture-handler";
import { Dispatch, SetStateAction, useState } from "react";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import ThemedButton from "../Buttons/ThemedButton";
import { Theme } from "@/src/types/Contexts";
import { Colors } from "@/src/constants/Colors";
import { storeLanguage } from "@/src/utils/AsyncStorage/Language";
import { router } from "expo-router";
import { Languages } from "@/src/constants/Strings";
import { useTranslation } from "react-i18next";

const LangButton = ({
  language,
  selectedLanguage,
  onPress,
}: {
  language: string;
  selectedLanguage?: string;
  onPress: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const { theme } = useSettingsContext();
  const isSelectedLang = language === selectedLanguage;
  const styles = selectLanguageStyles(theme, isSelectedLang);

  return (
    <View style={styles.languangeBtnContainer}>
      <BaseButton style={styles.languangeBtn} onPress={() => onPress(language)}>
        <Text style={styles.languangeBtnText}>{language}</Text>
      </BaseButton>
    </View>
  );
};

const SelectLanguage = () => {
  const { theme } = useSettingsContext();
  const styles = selectLanguageStyles(theme);
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
    undefined
  );

  const { i18n } = useTranslation();

  let continueBtnTxt;
  switch (selectedLanguage) {
    case "Español":
      continueBtnTxt = "Continuar";
      break;
    case "English":
      continueBtnTxt = "Continue";
      break;
    default:
      continueBtnTxt = "Continue";
      break;
  }

  const concludeSelectingLanguage = async () => {
    if (!selectedLanguage) return;
    await storeLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Language / Idioma</Text>
      <View style={styles.buttonsContainer}>
        <LangButton
          language={Languages.english}
          selectedLanguage={selectedLanguage}
          onPress={setSelectedLanguage}
        />
        <LangButton
          language={Languages.spanish}
          selectedLanguage={selectedLanguage}
          onPress={setSelectedLanguage}
        />
      </View>
      {selectedLanguage && (
        <ThemedButton onPress={concludeSelectingLanguage}>
          {continueBtnTxt}
        </ThemedButton>
      )}
    </View>
  );
};

export default SelectLanguage;

const selectLanguageStyles = (theme: Theme, isSelectedLang?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
      alignItems: "center",
      gap: 100,
      paddingTop: 60,
    },
    title: {
      fontWeight: "bold",
      fontSize: 24,
      color: Colors[theme].text,
      textAlign: "center",
    },
    buttonsContainer: { flexDirection: "row", gap: 20 },
    languangeBtnContainer: {
      justifyContent: "center",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: isSelectedLang ? "transparent" : Colors.greyText,
      backgroundColor: isSelectedLang ? Colors.greyText : "transparent",
    },
    languangeBtn: {
      justifyContent: "center",
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 16,
    },
    languangeBtnText: {
      color: Colors[theme].text,
      opacity: !isSelectedLang ? 0.5 : 1,
    },
  });
