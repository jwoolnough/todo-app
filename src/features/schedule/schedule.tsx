import { addDays, format, isPast, isToday, startOfWeek } from "date-fns";
import React from "react";

import { Box } from "@/components/box";

import { clsxm } from "@/utils/clsxm";

import { AddTask } from "../task";
import { Cell } from "./cell";
import { TimeIndicator } from "./time-indicator";

const CELLS_PER_TIME_OF_DAY = 4;

const Schedule = () => {
  // const { data } = api.task.getTasksByWeek();

  const now = new Date();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
  const timesOfDay = ["AM", "PM", "Eve"];
  const startOfWeekDate = startOfWeek(now, { weekStartsOn: 1 });

  return (
    <Box
      as="main"
      className="mr-2 snap-x overflow-auto pb-0 pr-0 max-sm:ml-2 sm:mb-2 sm:pl-10"
    >
      <div className="relative grid h-full w-min min-w-full grid-cols-[min-content,repeat(7,calc(100vw-4rem))] grid-rows-[min-content,repeat(12,minmax(3rem,1fr))] sm:grid-cols-[min-content,repeat(7,minmax(12rem,1fr))]">
        <div className="sticky left-0 z-10 row-span-full grid grid-rows-[subgrid] before:pointer-events-none before:absolute before:right-0 before:h-full before:w-6 before:bg-gradient-to-r before:from-slate-900 sm:before:w-10">
          <div role="presentation"></div>
          {timesOfDay.map((timeOfDay) => (
            <div
              key={timeOfDay}
              className="text-3xs sm:text-2xs relative row-span-4 text-right uppercase before:absolute before:right-0 before:top-0 before:w-10 before:border-t before:border-slate-900"
            >
              <span className="absolute right-0 top-[1px] -translate-y-1/2 sm:pr-2">
                {timeOfDay}
              </span>
            </div>
          ))}

          <TimeIndicator />
        </div>

        {days.map((day, i) => {
          const dayDate = addDays(startOfWeekDate, i);
          const isCurrent = isToday(dayDate);
          const isPastDay = isPast(dayDate);

          return (
            <div
              className="relative z-10 row-span-full grid snap-center grid-rows-[subgrid]"
              key={day}
            >
              <div
                className={clsxm(
                  "pb-6 text-center text-white",
                  isPastDay && "text-slate-700",
                  isCurrent &&
                    "relative text-green-500 after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-12 after:-translate-x-1/2 after:rounded-t-full after:bg-green-500",
                )}
              >
                <h3>{day}</h3>
                <div className={clsxm("text-3xl font-bold")}>
                  {format(dayDate, "d")}
                </div>
              </div>

              {timesOfDay.map((timeOfDay) => (
                <div
                  key={timeOfDay}
                  className="relative row-span-4 grid grid-rows-[subgrid] border-t border-slate-700"
                >
                  {Array.from({ length: CELLS_PER_TIME_OF_DAY }, (_, i) => (
                    <Cell
                      key={i}
                      className={clsxm(
                        i === 0 && "border-none",
                        day === "Mon" && "pl-0",
                        day === "Sun" && "pr-0",
                      )}
                    >
                      <AddTask
                        status="SCHEDULED"
                        className="h-full rounded-md border bg-slate-800 px-3 py-2 opacity-0 transition-opacity duration-300 focus-within:opacity-100 hover:opacity-75 focus-within:hover:opacity-100"
                      />
                    </Cell>
                  ))}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export { Schedule };
