import { useContext } from "react";
import HeaderContext from "./HeaderContext";

const useHeaderContext = () => {
  const headerContext = useContext(HeaderContext);
  if (!headerContext) throw new Error("Failed to load HeaderContext");
  const { showBackArrowButton, toggleShowBackArrowButton, showQuitModal, toggleShowQuitModal } =
    headerContext;
  return { showBackArrowButton, toggleShowBackArrowButton, showQuitModal, toggleShowQuitModal };
};

export default useHeaderContext;
