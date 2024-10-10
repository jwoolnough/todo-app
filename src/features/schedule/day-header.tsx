"use client";

import { addDays, format, isToday } from "date-fns";

import { WEEKDAYS } from "~/constants";
import { cn } from "~/utils";

import { useDateQuery } from "./hooks/use-date-query";

const DayHeader = () => {
  const { selectedWeekDate } = useDateQuery();

  return (
    <div className="sticky top-0 z-20 col-span-full grid grid-cols-subgrid border-b bg-navy-950">
      <div
        role="presentation"
        className="sticky left-0 z-10 bg-navy-950 before:absolute before:bottom-0 before:left-full before:top-0 before:w-3 before:bg-gradient-to-r before:from-navy-950 after:absolute after:left-0 after:right-0 after:top-full after:h-3 after:bg-gradient-to-b after:from-navy-950"
      >
        <svg
          className="absolute left-full top-full z-10 ml-[-1px] h-[13px] w-[13px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 13 13"
        >
          <path
            className="fill-navy-950"
            d="M13,1.05V0H0v13h1.05C1.54,6.62,6.62,1.54,13,1.05Z"
          />
          <path
            className="fill-navy-300/25"
            d="M13,1.05V0H0v13h1.05C1.54,6.62,6.62,1.54,13,1.05Z"
          />
          <path className="fill-navy-950" d="M13,0H0v13C0,5.82,5.82,0,13,0Z" />
        </svg>
      </div>

      {WEEKDAYS.map((day, i) => {
        const date = addDays(selectedWeekDate, i);

        return (
          <div
            id={day.toLowerCase()}
            key={day}
            className={cn(
              "flex snap-start scroll-ml-[calc(var(--gap)+3rem)] items-baseline py-3 max-md:gap-3 md:flex-col md:items-center md:uppercase",
              isToday(date) && "text-green-500 drop-shadow-neon",
            )}
          >
            <span
              className={cn(
                "text-lg font-semibold text-white md:hidden",
                isToday(date) && "text-green-500",
              )}
            >
              {day}
            </span>{" "}
            <span className="md:hidden">{format(date, "do")}</span>
            <span className="text-sm max-md:hidden">{format(date, "eee")}</span>
            <span
              className={cn(
                "text-lg text-white max-md:hidden",
                isToday(date) && "text-green-500",
              )}
            >
              {format(date, "d")}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export { DayHeader };
