"use client";

import { endOfWeek, format } from "date-fns";

import { startOfWeek } from "~/utils";

import { useDateQuery } from "../hooks/use-date-query";

const getWeekTitle = (selectedDate: Date) => {
  const startOfWeekDate = startOfWeek(selectedDate);
  const endOfWeekDate = endOfWeek(selectedDate);

  if (startOfWeekDate.getMonth() === endOfWeekDate.getMonth()) {
    return format(startOfWeekDate, "MMMM y");
  }

  return `${format(startOfWeekDate, "MMMM")} - ${format(endOfWeekDate, "MMMM y")}`;
};

const ScheduleTitle = () => {
  const { selectedWeekDate } = useDateQuery();

  return (
    <>
      <h1>{getWeekTitle(selectedWeekDate)}</h1>
      <p className="[@media(width<23.75em)]:hidden">
        Week {format(selectedWeekDate, "w")}
      </p>
    </>
  );
};

export { ScheduleTitle };
