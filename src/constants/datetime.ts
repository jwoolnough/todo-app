const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const DAY_HOURS = Array.from({ length: 24 - 8 }, (_, i) => i + 8);
const HOUR_SUBDIVISIONS = 2;
const DAY_TIMES = [
  ...DAY_HOURS.flatMap((hour) =>
    Array.from(
      { length: HOUR_SUBDIVISIONS },
      (_, i) =>
        `${String(hour).padStart(2, "0")}:${String(
          (i * 60) / HOUR_SUBDIVISIONS,
        ).padStart(2, "0")}`,
    ),
  ),
  // Manually add midnight as it's not included in the above
  "24:00",
];

export { WEEKDAYS, DAY_TIMES };
