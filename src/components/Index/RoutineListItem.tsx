import { Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import ConfirmDeleteRoutineModal from "./ConfirmDeleteRoutineModal";
import CurrentThemedButton from "../Buttons/CurrentThemedButton";
import DeleteAnimation from "../DeleteAnimatedButton/DeleteAnimation";
import ThemedButton from "../Buttons/ThemedButton";
import { Colors } from "@/src/constants/Colors";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import useDeleteAnimation from "@/src/hooks/useDeleteAnimation";
import useModal from "@/src/hooks/useModal";
import { RoutinesListItemProps } from "@/src/types/Components";
import { Theme } from "@/src/types/Contexts";
import { useTranslation } from "react-i18next";

export default function RoutineListItem({
  routineName,
  madeOn,
  id,
  isCurrent = false,
}: RoutinesListItemProps) {
  const { theme } = useSettingsContext();
  const styles = routinesListStyles(theme, isCurrent);
  const { t } = useTranslation();

  const { isLeftSide, position, animateBackToTheBeginning } =
    useDeleteAnimation();

  const {
    isModalOpen: isDeleting,
    openModal: handleOpenModal,
    closeModal,
  } = useModal();

  const handleCloseModal = () => {
    animateBackToTheBeginning();
    closeModal();
  };

  return (
    <>
      {isDeleting && (
        <ConfirmDeleteRoutineModal
          id={id}
          name={routineName}
          closeModal={handleCloseModal}
        />
      )}
      <DeleteAnimation
        containerViewStyles={styles.itemList}
        isCurrent={isCurrent}
        isRoutine
        onDelete={handleOpenModal}
        position={position}
        isLeftSide={isLeftSide}
      >
        <Link href={`/routine/${id}`} asChild>
          {isCurrent ? (
            <CurrentThemedButton routineName={routineName} />
          ) : (
            <ThemedButton>{routineName}</ThemedButton>
          )}
        </Link>
        <Text style={styles.madeOnText}>
          {t("madeOn")}
          <Text style={styles.bold}>{madeOn}</Text>
        </Text>
      </DeleteAnimation>
    </>
  );
}

const routinesListStyles = (theme: Theme, isCurrent: boolean) =>
  StyleSheet.create({
    bold: { fontWeight: "bold" },
    itemList: {
      gap: 4,
      width: "50%",
      margin: "auto",
      overflow: "hidden",
    },
    madeOnText: { color: Colors[theme].text, fontSize: 12 },
  });
