"use client";

import { format } from "date-fns";

import { useDateQuery } from "../hooks/use-date-query";

const ScheduleTitle = () => {
  const { selectedWeekDate } = useDateQuery();

  return (
    <>
      <h1>{format(selectedWeekDate, "MMMM y")}</h1>
      <p className="[@media(width<380px)]:hidden">
        Week {format(selectedWeekDate, "w")}
      </p>
    </>
  );
};

export { ScheduleTitle };
