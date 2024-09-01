import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Theme } from "@/src/types/Contexts";

const CheckboxContainer = ({
  isChecked,
  onPress,
  text,
}: {
  isChecked: boolean;
  onPress: (val: boolean) => void;
  text: string;
}) => {
  const { theme } = useThemeContext();
  const styles = checkboxContainerStyles(theme);
  return (
    <View style={styles.customContainer}>
      <Text style={styles.customText}>{text}</Text>
      <BouncyCheckbox
        size={18}
        fillColor={Colors.light.primary}
        innerIconStyle={{ borderWidth: 2 }}
        onPress={onPress}
        isChecked={isChecked}
      />
    </View>
  );
};

export default CheckboxContainer;

const checkboxContainerStyles = (theme: Theme) =>
  StyleSheet.create({
    customContainer: { flexDirection: "row", gap: 12, justifyContent: "flex-end" },
    customText: { textAlignVertical: "center", color: Colors[theme].text, fontSize: 12 },
  });
