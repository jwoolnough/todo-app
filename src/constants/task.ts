const TASK_TYPE = [
  "TODO_TODAY",
  "TODO_THIS_WEEK",
  "TODO_THIS_MONTH",
  "TODO_AT_SOME_POINT",
  "SCHEDULED",
  "COMPLETED",
] as const;

type TaskType = (typeof TASK_TYPE)[number];

export { TASK_TYPE, type TaskType };
