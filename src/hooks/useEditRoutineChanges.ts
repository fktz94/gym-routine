import { isEqual } from "lodash";
import { UseEditRoutineChanges } from "../types/Hooks";

const useEditRoutineChanges = ({
  data,
  originalRoutine,
  name,
  isCurrent,
  toCurrent,
  openModal,
  isChangingName,
  handleName,
  setIsChangingName,
}: UseEditRoutineChanges) => {
  const { data: originalData } = originalRoutine;
  const hasChanges = !isEqual(data, originalData) || originalRoutine.name !== name;
  const setToCurrent = !isCurrent && toCurrent;
  const isButtonDisabled = !hasChanges && !setToCurrent;
  const handleSaveChanges = () => {
    if (isButtonDisabled) return;
    openModal();
  };
  const toggleChangingName = () => {
    if (isChangingName) {
      handleName(originalRoutine.name);
    }
    setIsChangingName(!isChangingName);
  };
  return { handleSaveChanges, isButtonDisabled, toggleChangingName };
};

export default useEditRoutineChanges;
