"use client";

import { format } from "date-fns";

import { useDateQuery } from "../hooks/use-date-query";

const ScheduleTitle = () => {
  const { selectedWeek } = useDateQuery();

  return (
    <>
      <h1>{format(selectedWeek, "MMMM y")}</h1>
      <p>Week {format(selectedWeek, "w")}</p>
    </>
  );
};

export { ScheduleTitle };
