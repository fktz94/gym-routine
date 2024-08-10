import { NewRoutineContextProps } from "@/src/types/Contexts";
import { createContext } from "react";

const NewRoutineContext = createContext<NewRoutineContextProps | null>(null);

export default NewRoutineContext;
