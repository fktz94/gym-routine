import { useState } from "react";

const useHeader = () => {
  const [showBackArrowButton, setShowBackArrowButton] = useState(true);

  const toggleShowBackArrowButton = (val: boolean) => {
    setShowBackArrowButton(val);
  };

  return { showBackArrowButton, toggleShowBackArrowButton };
};

export default useHeader;
