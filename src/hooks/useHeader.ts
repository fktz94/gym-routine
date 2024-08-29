import { useState } from "react";

const useHeader = () => {
  const [showBackArrowButton, setShowBackArrowButton] = useState(true);
  const [showQuitModal, setShowQuitModal] = useState(false);

  const toggleShowBackArrowButton = (val: boolean) => {
    setShowBackArrowButton(val);
  };

  const toggleShowQuitModal = (val: boolean) => {
    setShowQuitModal(val);
  };

  return { showBackArrowButton, toggleShowBackArrowButton, showQuitModal, toggleShowQuitModal };
};

export default useHeader;
