const TASK_STATUS = [
  "TODO_TODAY",
  "TODO_THIS_WEEK",
  "TODO_THIS_MONTH",
  "TODO_AT_SOME_POINT",
  "SCHEDULED",
  "COMPLETED",
] as const;

type TaskStatus = (typeof TASK_STATUS)[number];

export { TASK_STATUS, type TaskStatus };
