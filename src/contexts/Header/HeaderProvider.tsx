import { PropsWithChildren } from "react";
import HeaderContext from "./HeaderContext";
import useHeader from "@/src/hooks/useHeader";

export default function HeaderProvider({ children }: PropsWithChildren) {
  const { showBackArrowButton, toggleShowBackArrowButton } = useHeader();
  return (
    <HeaderContext.Provider value={{ showBackArrowButton, toggleShowBackArrowButton }}>
      {children}
    </HeaderContext.Provider>
  );
}
