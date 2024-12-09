import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Colors } from "@/src/constants/Colors";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { Theme } from "@/src/types/Contexts";
import { useTranslation } from "react-i18next";

const WarmUpTitle = (props: { containerStyle?: ViewStyle }) => {
  const { theme } = useSettingsContext();
  const styles = exerciseListTitleStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={[styles.warmUpTitleItem, props?.containerStyle]}>
      <Text style={styles.warmUpTitleText}>{t("exercise")}</Text>
      <Text style={styles.warmUpTitleText}>{t("sets")}</Text>
      <Text style={styles.warmUpTitleText}>{t("repetitionsTime")}</Text>
    </View>
  );
};

export default WarmUpTitle;

const exerciseListTitleStyles = (theme: Theme) =>
  StyleSheet.create({
    warmUpTitleItem: {
      flexDirection: "row",
      overflow: "hidden",
      width: "100%",
    },
    warmUpTitleText: {
      paddingHorizontal: 6,
      paddingVertical: 8,
      textAlign: "center",
      fontWeight: "bold",
      backgroundColor: Colors[theme].modalBackground,
      color: Colors[theme].text,
      flexGrow: 1,
      width: 1,
      textAlignVertical: "center",
    },
  });
