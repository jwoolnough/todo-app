const TODO_TYPE = [
  "TODO_TODAY",
  "TODO_THIS_WEEK",
  "TODO_THIS_MONTH",
  "TODO_AT_SOME_POINT",
  "SCHEDULED",
  "COMPLETED",
] as const;

type TodoType = (typeof TODO_TYPE)[number];

export { TODO_TYPE, type TodoType };
