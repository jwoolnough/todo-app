import { addDays, format, isPast, isToday, startOfWeek } from "date-fns";
import React from "react";

import { clsxm } from "@/utils/clsxm";

import { TimeIndicator } from "./time-indicator";

const Schedule = () => {
  const now = new Date();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timesOfDay = ["AM", "PM", "Eve"];
  const startOfWeekDate = startOfWeek(now, { weekStartsOn: 1 });

  return (
    <div className="relative ml-6 grid flex-grow grid-cols-7 grid-rows-[min-content,repeat(12,minmax(0,1fr))]">
      <TimeIndicator />

      {days.map((day, i) => {
        const dayDate = addDays(startOfWeekDate, i);
        const isCurrent = isToday(dayDate);
        const isPastDay = isPast(dayDate);

        return (
          <div className="row-span-full grid grid-rows-[subgrid]" key={day}>
            <div
              className={clsxm(
                "pb-6 text-center text-white",
                isPastDay && "text-slate-700",
                isCurrent &&
                  "relative text-green-500 after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-12 after:-translate-x-1/2 after:rounded-t-full after:bg-green-500",
              )}
            >
              <h3 className={clsxm("")}>{day}</h3>
              <div className={clsxm("text-3xl font-bold")}>
                {format(dayDate, "d")}
              </div>
            </div>

            {timesOfDay.map((timeOfDay) => (
              <div
                key={timeOfDay}
                className="relative row-span-4 grid grid-rows-[subgrid] border-t border-slate-700"
              >
                {i === 0 && (
                  <span className="text-2xs absolute right-full -mt-[1px] mr-2 -translate-y-1/2 uppercase">
                    {timeOfDay}
                  </span>
                )}
                <div className=""></div>
                <div className="border-t"></div>
                <div className="border-t"></div>
                <div className="border-t"></div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export { Schedule };
