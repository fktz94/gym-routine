import { Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import ConfirmDeleteRoutineModal from "./ConfirmDeleteRoutineModal";
import DeleteAnimation from "../Animations/DeleteAnimation";
import CurrentThemedButton from "../Buttons/CurrentThemedButton";
import ThemedButton from "../Buttons/ThemedButton";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import useDeleteAnimation from "@/src/hooks/useDeleteAnimation";
import useModal from "@/src/hooks/useModal";
import { RoutinesItemListProps } from "@/src/types/Components";
import { Theme } from "@/src/types/Contexts";

export default function RoutineItemList({
  routineName,
  madeOn,
  id,
  isCurrent = false,
}: RoutinesItemListProps) {
  const { theme } = useThemeContext();
  const styles = routinesListStyles(theme, isCurrent);

  const { panResponder, translateX, animateBackToTheBeginning } = useDeleteAnimation();

  const { isModalOpen: isDeleting, openModal: handleOpenModal, closeModal } = useModal();

  const handleCloseModal = () => {
    animateBackToTheBeginning();
    closeModal();
  };

  return (
    <>
      {isDeleting && (
        <ConfirmDeleteRoutineModal id={id} name={routineName} closeModal={handleCloseModal} />
      )}
      <DeleteAnimation
        containerViewStyles={styles.itemList}
        isCurrent={isCurrent}
        isRoutine
        onDelete={handleOpenModal}
        panResponder={panResponder}
        translateX={translateX}
      >
        <Link href={`/routine/${id}`} asChild>
          {isCurrent ? (
            <CurrentThemedButton routineName={routineName} />
          ) : (
            <ThemedButton>{routineName}</ThemedButton>
          )}
        </Link>
        <Text style={styles.madeOnText}>
          Made on <Text style={styles.bold}>{madeOn}</Text>
        </Text>
      </DeleteAnimation>
    </>
  );
}

const routinesListStyles = (theme: Theme, isCurrent: boolean) =>
  StyleSheet.create({
    bold: { fontWeight: "bold" },
    itemList: { gap: 4, width: "50%", margin: "auto", overflow: "hidden" },
    madeOnText: { color: Colors[theme].text, fontSize: 12 },
    deleteButton: {
      backgroundColor: Colors.cancelBackground,
      justifyContent: "center",
      position: "absolute",
      width: 70,
      height: isCurrent ? "78%" : "71%",
      right: -70,
      borderRadius: 11,
    },
    deleteButtonText: {
      textAlign: "center",
      fontSize: 14,
      fontWeight: "bold",
      letterSpacing: 1,
      color: Colors.light.background,
    },
  });
