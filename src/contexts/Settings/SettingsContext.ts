import { SettingsValueType } from "@/src/types/Contexts";
import { createContext } from "react";

const SettingsContext = createContext<SettingsValueType>(null);

export default SettingsContext;
