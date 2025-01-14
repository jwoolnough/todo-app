"use client";

import { format } from "date-fns";

import { endOfWeek, startOfWeek } from "~/utils/date";

import { useDateQuery } from "../hooks/use-date-query";
import styles from "./styles.module.css";

const renderWeekTitle = (selectedDate: Date): React.ReactNode => {
  const startOfWeekDate = startOfWeek(selectedDate);
  const endOfWeekDate = endOfWeek(selectedDate);

  if (startOfWeekDate.getMonth() === endOfWeekDate.getMonth()) {
    return format(startOfWeekDate, "MMMM y");
  }

  const startMonth = format(startOfWeekDate, "MMMM");
  const endMonth = format(endOfWeekDate, "MMMM");

  return (
    <>
      {startMonth.substring(0, 3)}
      <span className={styles.monthSuffix}>
        {startMonth.substring(3)}
      </span> - {endMonth.substring(0, 3)}
      <span className={styles.monthSuffix}>{endMonth.substring(3)}</span>{" "}
      {format(endOfWeekDate, "y")}
    </>
  );
};

const ScheduleTitle = () => {
  const { selectedWeekDate } = useDateQuery();

  return (
    <>
      <h1>{renderWeekTitle(selectedWeekDate)}</h1>
      <p className={styles.weekNumber}>Week {format(selectedWeekDate, "w")}</p>
    </>
  );
};

export { ScheduleTitle };
