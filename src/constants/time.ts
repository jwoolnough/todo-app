const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type Day = (typeof DAYS)[number];

const TIMES_OF_DAY = ["AM", "PM", "EVE"] as const;

export { DAYS, TIMES_OF_DAY, type Day };
