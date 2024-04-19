"use client";

import { addDays, format, isToday } from "date-fns";

import { WEEKDAYS } from "~/constants";
import { cn } from "~/utils";

import { useDateQuery } from "./hooks/use-date-query";

const ScheduleDayPicker = () => {
  const { selectedWeekDate } = useDateQuery();

  return (
    <nav>
      <ol className="flex justify-between md:hidden">
        {WEEKDAYS.map((weekday, i) => {
          const dayDate = addDays(selectedWeekDate, i);

          return (
            <li key={weekday.toLowerCase()}>
              <a
                href={`#${weekday.toLowerCase()}`}
                className="block rounded-lg text-center text-sm"
              >
                {weekday.slice(0, 1)}
                <div
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full font-semibold text-white transition",
                    isToday(dayDate) && "text-green-500",
                    // TODO: Plumb in active state properly
                    i === 1 && "bg-green-500 text-black shadow-neon",
                  )}
                >
                  {format(dayDate, "d")}
                </div>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export { ScheduleDayPicker };
