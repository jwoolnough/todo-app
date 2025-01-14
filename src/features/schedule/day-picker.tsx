"use client";

import { addDays, format, isToday } from "date-fns";

import { WEEKDAYS } from "~/constants";
import { cn } from "~/utils";

import { useDateQuery } from "./hooks/use-date-query";

const ScheduleDayPicker = () => {
  const { selectedWeekDate } = useDateQuery();

  const handleClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    const hash = (e.target as HTMLAnchorElement).hash;

    if (!hash) return;

    document
      .querySelector(hash)
      ?.scrollIntoView({ behavior: "smooth", inline: "start" });
  };

  return (
    <nav className="sticky left-0 z-30 w-screen md:hidden">
      <ol className="mt-6 flex justify-between px-6">
        {WEEKDAYS.map((weekday, i) => {
          const dayDate = addDays(selectedWeekDate, i);

          return (
            <li key={weekday.toLowerCase()}>
              <a
                href={`#${weekday.toLowerCase()}`}
                className="block rounded-lg text-center text-sm"
                aria-label={weekday}
                onClick={handleClick}
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
