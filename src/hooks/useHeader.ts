import { useState } from "react";

const useHeader = () => {
  const [showBackArrowButton, setShowBackArrowButton] = useState(true);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [hasUpdatedValues, setHasUpdatedValues] = useState(false);

  const toggleShowBackArrowButton = (val: boolean) => {
    setShowBackArrowButton(val);
  };

  const toggleShowQuitModal = (val: boolean) => {
    setShowQuitModal(val);
  };

  const toggleHasUpdatedValues = (val: boolean) => {
    setHasUpdatedValues(val);
  };

  return {
    showBackArrowButton,
    toggleShowBackArrowButton,
    showQuitModal,
    toggleShowQuitModal,
    hasUpdatedValues,
    toggleHasUpdatedValues,
  };
};

export default useHeader;
