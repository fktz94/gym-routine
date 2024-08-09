enum NewRoutineActionsTypes {
  SETNAME = "setName",
}

type NewRoutineActions =
  | { type: NewRoutineActionsTypes.SETNAME; payload: string }
  | { type: ""; payload: number };
