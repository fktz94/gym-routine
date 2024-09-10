import { Modal, StyleSheet, View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomLoader from "./CustomLoader";
import { CancelButton } from "./Buttons/CancelButton";
import { AcceptButton } from "./Buttons/AcceptButton";
import { Colors } from "../constants/Colors";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { ThemedModalProps } from "../types/Components";
import { Theme } from "../types/Contexts";

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
          <CustomLoader />
        ) : (
          <>
            <Ionicons
              style={styles.closeIconBtn}
              name="close"
              color={Colors[theme].text}
              size={30}
              onPress={closeModal}
            />
            <ScrollView contentContainerStyle={styles.childrenContainer}>
              {children}
              <View style={styles.buttonsContainer}>
                <CancelButton onCancel={closeModal} isIcon={buttonsAreIcons} />
                <AcceptButton
                  onAccept={handleAccept}
                  isDisabled={isAcceptBtnDisabled}
                  isIcon={buttonsAreIcons}
                />
              </View>
            </ScrollView>
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
      zIndex: 999,
    },
    container: {
      flex: 1,
      backgroundColor: Colors[theme].modalBackground,
      alignItems: "center",
    },
    childrenContainer: {
      margin: "auto",
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
