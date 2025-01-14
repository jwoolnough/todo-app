"use client";

import {
  differenceInMinutes,
  getHours,
  getMilliseconds,
  getSeconds,
} from "date-fns";
import { useEffect, useState } from "react";

import { isSameWeek } from "~/utils/date";

import { cn } from "~/utils";

import { useDateQuery } from "./hooks/use-date-query";
import { TimeIndicator } from "./time-indicator";

const START_HOUR = 8;
const TIMES = Array.from({ length: 25 - START_HOUR }, (_, i) => {
  const hour = i + START_HOUR;

  let label = String(hour);

  if (hour === 12) label = "PM";
  if (hour === 18) label = "EVE";

  return { time: new Date().setHours(hour, 0, 0, 0), label };
});

const TimeSidebar = () => {
  const { selectedWeekDate } = useDateQuery();
  const [hiddenTime, setHiddenTime] = useState<number | null>(null);
  const now = new Date();
  const isThisWeek = isSameWeek(now, selectedWeekDate);

  useEffect(() => {
    if (!isThisWeek) return;

    let timeout: NodeJS.Timeout;

    // TODO: Refactor to useIntervalEffect or similar
    const tick = () => {
      clearTimeout(timeout);

      // get ms remaining until next minute
      const now = new Date();
      const ms = 60000 - (getSeconds(now) * 1000 + getMilliseconds(now));

      if (getHours(now) >= START_HOUR && getHours(now) < 24) {
        const nextTime = TIMES.find(({ time }) => {
          return Math.abs(differenceInMinutes(time, now)) < 10;
        });

        setHiddenTime(nextTime?.time ?? null);
      }

      timeout = setTimeout(tick, ms);
    };

    tick();

    return () => {
      clearTimeout(timeout);
    };
  }, [isThisWeek]);

  return (
    <div className="sticky left-0 z-10 row-start-2 row-end-[-1] mt-[calc(var(--gap)*-1)] grid grid-rows-subgrid border-r bg-navy-950 pt-[var(--gap)] text-right text-sm">
      {TIMES.map(({ time, label }) => (
        <div
          className={cn(
            "row-span-2 px-3 md:pl-4",
            ["PM", "EVE"].includes(label) && "text-white",
          )}
          key={time}
        >
          <div
            className={cn(
              "mt-[calc(var(--gap)*-1/2)] [:not(:first-child)>&]:-translate-y-1/2",
              hiddenTime === time && "opacity-0",
            )}
          >
            {label}
          </div>
        </div>
      ))}

      <TimeIndicator />
    </div>
  );
};

export { TimeSidebar };
