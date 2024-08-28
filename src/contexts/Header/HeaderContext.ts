import { HeaderContextType } from "@/src/types/Contexts";
import { createContext } from "react";

const HeaderContext = createContext<HeaderContextType>(null);

export default HeaderContext;
