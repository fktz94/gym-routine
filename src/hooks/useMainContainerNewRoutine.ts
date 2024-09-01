import useModal from "./useModal";
import useNewRoutineContext from "../contexts/NewRoutine/useNewRoutineContext";

const useMainContainerNewRoutine = () => {
  const { handleStep, newRoutineState, step, handleClearWarmUp, hasWarmUpRoutine } =
    useNewRoutineContext();
  const { name } = newRoutineState;

  const { closeModal, isModalOpen: isCreating, openModal } = useModal();

  const isFirstStep = step === 0;
  const isLastStep = step === 1;

  const isNextBtnDisabled = isFirstStep && !name;

  const nextBtnFn = () => {
    if (isLastStep) {
      openModal();
    } else {
      if (!hasWarmUpRoutine) {
        handleClearWarmUp();
      }
      handleStep({ direction: "up" });
    }
  };

  const backBtnFn = () => handleStep({ direction: "down" });

  return {
    step,
    closeModal,
    isCreating,
    isFirstStep,
    isLastStep,
    isNextBtnDisabled,
    nextBtnFn,
    backBtnFn,
  };
};

export default useMainContainerNewRoutine;
