import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Colors } from "@/src/constants/Colors";
import SelectDropdown from "react-native-select-dropdown";
import { FirstStepProps } from "@/src/types/Components";
import { Ionicons } from "@expo/vector-icons";

const FirstStep = ({ name, handleName, handleDays }: FirstStepProps) => {
  const { theme } = useThemeContext();
  const styles = firstStepStyles(theme);

  const days = new Array(7).fill("").map((_, i) => i + 1);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>First, give it a name.</Text>
        <Text style={styles.subtitle}>(Normally, the month's name)</Text>
        <TextInput value={name} onChangeText={handleName} style={styles.textInput} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Then, select how many days per week will the routine have.</Text>
        <SelectDropdown
          data={days}
          defaultValue={days[2]}
          onSelect={(el) => handleDays(el)}
          renderButton={(selectedItem, isOpened) => (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>{selectedItem}</Text>
              <Ionicons
                style={styles.dropdownButtonArrowStyle}
                name={isOpened ? "chevron-up" : "chevron-down"}
              />
            </View>
          )}
          renderItem={(el, _, isSelected) => (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && {
                  backgroundColor: theme === "light" ? Colors[theme].primary : Colors[theme].text,
                }),
              }}
            >
              <Text
                style={{
                  ...styles.dropdownItemTxtStyle,
                  ...(isSelected && {
                    color: theme === "light" ? Colors[theme].background : Colors[theme].primary,
                  }),
                }}
              >
                {el}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>
    </View>
  );
};

export default FirstStep;

const firstStepStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      paddingTop: 40,
      flex: 1,
      gap: 80,
    },
    container: {
      gap: 25,
    },
    title: {
      color: Colors[theme].text,
      fontWeight: "bold",
      letterSpacing: 1,
      textAlign: "center",
      fontSize: 20,
    },
    subtitle: {
      color: Colors[theme].text,
      fontWeight: "bold",
      letterSpacing: 0.5,
      textAlign: "center",
      marginTop: -20,
    },
    textInput: {
      fontSize: 24,
      paddingVertical: 10,
      paddingHorizontal: 20,
      color: Colors[theme].text,
      borderWidth: 1,
      borderColor: Colors[theme].primary,
    },
    dropdownButtonStyle: {
      width: "30%",
      margin: "auto",
      backgroundColor: Colors[theme].secondaryTransparent,
      borderRadius: 12,
      flexDirection: "row",
      justifyContent: "center",
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
