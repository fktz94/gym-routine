import { ThemeValueType } from "@/src/types/Contexts";
import { createContext } from "react";

const ThemeContext = createContext<ThemeValueType>(null);

export default ThemeContext;
