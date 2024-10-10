"use client";

import { differenceInCalendarDays, isSameWeek } from "date-fns";

import { cn, startOfWeek } from "~/utils";

import { useDateQuery } from "./hooks/use-date-query";

const PastDays = () => {
  const { selectedWeekDate } = useDateQuery();
  const now = new Date();

  // Don't render if not on the current week
  if (!isSameWeek(selectedWeekDate, now)) return null;

  const column = differenceInCalendarDays(now, startOfWeek(now));

  const COLUMN_END = [
    "col-end-2",
    "col-end-3",
    "col-end-4",
    "col-end-5",
    "col-end-6",
    "col-end-7",
    "col-end-8",
  ];

  return (
    <div
      className={cn(
        "absolute inset-0 left-[calc(var(--gap)*-1)] col-start-1 row-span-full",
        COLUMN_END[column],
      )}
    >
      <svg width="100%" height="100%">
        <pattern
          id="pattern-hatch"
          patternUnits="userSpaceOnUse"
          width="4"
          height="4"
          patternTransform="scale(2)"
        >
          <path
            d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2"
            className="stroke-navy-800/30 stroke-[1.5px]"
          />
        </pattern>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#pattern-hatch)"
        />
      </svg>
    </div>
  );
};

export { PastDays };
