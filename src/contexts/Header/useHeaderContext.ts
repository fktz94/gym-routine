import { useContext } from "react";
import HeaderContext from "./HeaderContext";

const useHeaderContext = () => {
  const headerContext = useContext(HeaderContext);
  if (!headerContext) throw new Error("Failed to load HeaderContext");
  const { showBackArrowButton, toggleShowBackArrowButton } = headerContext;
  return { showBackArrowButton, toggleShowBackArrowButton };
};

export default useHeaderContext;
