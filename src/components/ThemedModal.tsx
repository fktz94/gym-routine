import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Colors } from "../constants/Colors";
import { ThemedModalProps } from "../types/Components";
import { Ionicons } from "@expo/vector-icons";
import { AcceptButton, CancelButton } from "./ThemedButton";

const ThemedModal = ({
  isLoading = false,
  closeModal,
  children,
  handleAccept,
  isAcceptBtnDisabled,
  buttonsAreIcons = false,
}: ThemedModalProps) => {
  const { theme } = useThemeContext();
  const styles = themedModalStyles(theme);

  return (
    <Modal animationType="slide" transparent>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size={80} color={Colors[theme].secondary} />
        ) : (
          <>
            <Ionicons
              style={styles.closeIconBtn}
              name="close"
              color={Colors[theme].text}
              size={30}
              onPress={closeModal}
            />
            <View style={styles.childrenContainer}>
              {children}
              <View style={styles.buttonsContainer}>
                <CancelButton onCancel={closeModal} isIcon={buttonsAreIcons} />
                <AcceptButton
                  onAccept={handleAccept}
                  isDisabled={isAcceptBtnDisabled}
                  isIcon={buttonsAreIcons}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default ThemedModal;

const themedModalStyles = (theme: Theme) =>
  StyleSheet.create({
    closeIconBtn: {
      position: "absolute",
      right: 0,
      top: 0,
      padding: 10,
      color: Colors[theme].background,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors[theme].modalBackground,
    },
    childrenContainer: {
      width: "80%",
      padding: 30,
      paddingVertical: 40,
      backgroundColor: Colors[theme].background,
      borderRadius: 10,
      gap: 40,
      elevation: 1,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
    buttonsContainer: {
      flexDirection: "row",
      gap: 20,
      justifyContent: "center",
    },
  });
