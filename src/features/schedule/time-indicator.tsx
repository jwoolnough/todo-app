"use client";

import {
  differenceInCalendarDays,
  format,
  getHours,
  getMilliseconds,
  getMinutes,
  getSeconds,
  isSameWeek,
} from "date-fns";
import { useEffect, useState } from "react";

import { cn, startOfWeek } from "~/utils";

import { useDateQuery } from "./hooks/use-date-query";

const getTopPercentage = () => {
  const now = new Date();

  const hoursOfDay = getHours(now);
  const minutesOfHour = getMinutes(now);

  return ((hoursOfDay * 60 + minutesOfHour - 8 * 60) / (16 * 60)) * 100;
};

const useTimePosition = () => {
  const [time, setTime] = useState(format(new Date(), "H:mm"));
  const [topPercentage, setTopPercentage] = useState(getTopPercentage());

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Update the position and time each minute
    const tick = () => {
      clearTimeout(timeout);

      // get ms remaining until next minute
      const now = new Date();
      const ms = 60000 - (getSeconds(now) * 1000 + getMilliseconds(now));

      setTopPercentage(getTopPercentage());
      setTime(format(now, "H:mm"));

      timeout = setTimeout(tick, ms);
    };

    tick();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return { time, topPercentage };
};

const TimeWrapper = ({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) => {
  const { selectedWeekDate } = useDateQuery();

  // Don't render if not on the current week
  if (!isSameWeek(selectedWeekDate, new Date())) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute bottom-[1.125rem] top-0",
        className,
      )}
      role="presentation"
    >
      {children}
    </div>
  );
};

const TimeIndicator = () => {
  const { time, topPercentage } = useTimePosition();
  console.log("I render");

  return (
    <TimeWrapper className="w-full">
      <span
        className={cn(
          "absolute right-0 z-10 -translate-y-1/2 bg-gradient-to-b from-[transparent] via-navy-950 to-[transparent] py-3 pr-3 text-[0.6875rem] text-green-500",
        )}
        style={
          topPercentage > 0 && topPercentage < 100
            ? { top: `${topPercentage}%` }
            : { display: "none" }
        }
        // TODO: Client only component?
        suppressHydrationWarning
      >
        <span className="drop-shadow-neon">{time}</span>
      </span>
    </TimeWrapper>
  );
};

const TimeBar = () => {
  const { topPercentage } = useTimePosition();
  const now = new Date();
  const column = differenceInCalendarDays(now, startOfWeek(now));

  const COLUMN_END = [
    "col-end-3",
    "col-end-4",
    "col-end-5",
    "col-end-6",
    "col-end-7",
    "col-end-8",
    "col-end-9",
  ];

  return (
    <TimeWrapper
      className={cn(
        "left-0 right-0 col-start-2 row-start-2 row-end-[-1]",
        COLUMN_END[column],
      )}
    >
      <div
        className="absolute left-[calc(var(--gap)*-1)] right-0 mt-[-3px] border-t border-green-500 drop-shadow-neon"
        style={
          topPercentage > 0 && topPercentage < 100
            ? { top: `${topPercentage}%` }
            : { display: "none" }
        }
      ></div>
      {/* Overlay dashed version of time line to sit overtop of tasks */}
      <div
        className="absolute left-[calc(var(--gap)*-1)] right-0 z-[5] mt-[-3px] border-t border-dashed border-green-500/25 after:absolute after:right-0 after:top-[-0.5px] after:h-[0.5625rem] after:-translate-y-1/2 after:border-r after:border-green-500"
        style={
          topPercentage > 0 && topPercentage < 100
            ? { top: `${topPercentage}%` }
            : { display: "none" }
        }
      ></div>
    </TimeWrapper>
  );
};

export { TimeIndicator, TimeBar };
