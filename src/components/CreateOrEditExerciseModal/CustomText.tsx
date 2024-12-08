import { StyleSheet, Text, View } from "react-native";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { Colors } from "@/src/constants/Colors";
import { Theme } from "@/src/types/Contexts";

const CustomText = ({ text }: { text: string }) => {
  const { theme } = useSettingsContext();
  const styles = customTextStyles(theme);

  return (
    <View style={styles.innerTextContainer}>
      <Text style={styles.baseText}>{text}</Text>
    </View>
  );
};

export default CustomText;

const customTextStyles = (theme: Theme) =>
  StyleSheet.create({
    innerTextContainer: {
      maxWidth: "80%",
      flexGrow: 1,
    },
    baseText: {
      color: Colors[theme].text,
      fontSize: 14,
      flexGrow: 1,
      textAlignVertical: "center",
    },
  });
