import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { CustomSelectDropdownProps } from "../types/Components";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Colors } from "../constants/Colors";
import { Theme } from "../types/Contexts";

const CustomSelectDropdown = ({
  data,
  defaultValue,
  onSelect,
  isExerciseItem = false,
  current,
  btnStyle,
  btnTextStyle,
  btnArrowStyle,
  itemStyle,
  itemTextStyle,
  menuStyle,
}: CustomSelectDropdownProps) => {
  const { theme } = useThemeContext();
  const styles = customSelectDropdownStyles(theme);

  return (
    <SelectDropdown
      data={data}
      defaultValue={defaultValue}
      onSelect={onSelect}
      renderButton={(selectedItem, isOpened) => (
        <View style={[styles.dropdownButtonStyle, btnStyle]}>
          <Text style={[styles.dropdownButtonTxtStyle, btnTextStyle]}>
            {isExerciseItem ? selectedItem?.rep : selectedItem}
          </Text>
          <Ionicons
            style={[styles.dropdownButtonArrowStyle, btnArrowStyle]}
            name={isOpened ? "chevron-up" : "chevron-down"}
          />
        </View>
      )}
      renderItem={(el, index, isSelected) => (
        <View
          style={{
            ...styles.dropdownItemStyle,
            ...(itemStyle && itemStyle),
            ...(isSelected && {
              backgroundColor: theme === "light" ? Colors[theme].primary : Colors[theme].text,
            }),
          }}
        >
          <Text
            style={{
              ...styles.dropdownItemTxtStyle,
              ...(itemTextStyle && itemTextStyle),
              ...(isSelected && {
                color: theme === "light" ? Colors[theme].background : Colors[theme].primary,
              }),
              ...(isExerciseItem && current === index && { color: "red" }),
            }}
          >
            {isExerciseItem ? el?.rep : el}
          </Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      dropdownStyle={{ ...styles.dropdownMenuStyle, ...(menuStyle && menuStyle) }}
    />
  );
};

export default CustomSelectDropdown;

const customSelectDropdownStyles = (theme: Theme) =>
  StyleSheet.create({
    dropdownButtonStyle: {
      width: "30%",
      margin: "auto",
      backgroundColor: Colors[theme].secondaryTransparent,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 18,
    },
    dropdownButtonTxtStyle: {
      flexGrow: 1,
      fontSize: 20,
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
