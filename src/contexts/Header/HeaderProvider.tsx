import { PropsWithChildren } from "react";
import HeaderContext from "./HeaderContext";
import useHeader from "@/src/hooks/useHeader";

export default function HeaderProvider({ children }: PropsWithChildren) {
  const {
    showBackArrowButton,
    toggleShowBackArrowButton,
    showQuitModal,
    toggleShowQuitModal,
    hasUpdatedValues,
    toggleHasUpdatedValues,
  } = useHeader();
  return (
    <HeaderContext.Provider
      value={{
        showBackArrowButton,
        toggleShowBackArrowButton,
        showQuitModal,
        toggleShowQuitModal,
        hasUpdatedValues,
        toggleHasUpdatedValues,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}
