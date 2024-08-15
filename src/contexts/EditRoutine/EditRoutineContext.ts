import { EditRoutineContextProps } from "@/src/types/Contexts";
import { createContext } from "react";

const EditRoutineContext = createContext<EditRoutineContextProps | null>(null);

export default EditRoutineContext;
