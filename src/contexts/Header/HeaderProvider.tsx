import { PropsWithChildren } from "react";
import HeaderContext from "./HeaderContext";
import useHeader from "@/src/hooks/useHeader";

export default function HeaderProvider({ children }: PropsWithChildren) {
  const { showBackArrowButton, toggleShowBackArrowButton, showQuitModal, toggleShowQuitModal } =
    useHeader();
  return (
    <HeaderContext.Provider
      value={{ showBackArrowButton, toggleShowBackArrowButton, showQuitModal, toggleShowQuitModal }}
    >
      {children}
    </HeaderContext.Provider>
  );
}
