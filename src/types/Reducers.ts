type NewRoutineActions =
  | { type: "setName"; payload: string }
  | { type: "setDays"; payload: number }
  | { type: "setWarmUp"; payload: boolean }
  | { type: "setDays"; payload: number }
  | { type: "setDays"; payload: number };
