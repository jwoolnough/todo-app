import { addDays, format, isToday, startOfWeek } from "date-fns";
import React, { useEffect, useRef } from "react";

import { Box } from "@/components/box";

import { clsxm } from "@/utils/clsxm";

import { AddTask } from "../task";
import { Cell } from "./cell";
import { TimeIndicator } from "./time-indicator";

const CELLS_PER_TIME_OF_DAY = 4;

const Schedule = () => {
  // const { data } = api.task.getTasksByWeek();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const now = new Date();
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ] as const;
  const timesOfDay = ["AM", "PM", "Eve"];
  const startOfWeekDate = startOfWeek(now, { weekStartsOn: 1 });

  // scroll today into view
  useEffect(() => {
    if (window.location.hash !== "") return;

    const dayColumn = document.querySelector(
      `#${format(now, "eeee").toLowerCase()}`,
    );

    // // Force to run on next tick
    setTimeout(() => {
      dayColumn?.scrollIntoView({
        block: "center",
      });

      // Set smooth scrolling on next frame to prevent weirdness when initally loading
      requestAnimationFrame(() => {
        if (!scrollerRef.current) return;
        scrollerRef.current.style.scrollBehavior = "smooth";
      });
    }, 0);
  }, []);

  return (
    <Box
      as="main"
      ref={scrollerRef}
      className="mr-2 grid snap-x overflow-auto pl-10 [container-type:inline-size] max-sm:ml-2 sm:mb-2"
    >
      <div className="relative grid h-full w-min min-w-full grid-cols-[min-content,repeat(7,calc(100cqw+1.5rem))] grid-rows-[min-content,repeat(12,minmax(3rem,1fr))] sm:grid-cols-[min-content,repeat(7,minmax(12rem,1fr))]">
        <div className="sticky left-0 z-10 row-span-full grid grid-rows-[subgrid] before:pointer-events-none before:absolute before:right-0 before:h-full before:w-10 before:bg-gradient-to-r before:from-slate-900">
          {/* Occupy the first row with blank div - simpler than offsetting the row-start below via array index */}
          <div role="presentation"></div>

          {timesOfDay.map((timeOfDay) => (
            <div
              key={timeOfDay}
              className="relative row-span-4 text-right text-3xs uppercase before:absolute before:right-0 before:top-0 before:w-10 before:border-t before:border-slate-900 sm:text-2xs"
            >
              <span className="absolute right-0 top-[1px] -translate-y-1/2 pr-2">
                {timeOfDay}
              </span>
            </div>
          ))}

          <TimeIndicator />
        </div>

        {days.map((day, i) => {
          const dayDate = addDays(startOfWeekDate, i);
          const isCurrent = isToday(dayDate);

          return (
            <div
              id={`${day.toLowerCase()}`}
              className="row-span-full grid snap-end grid-rows-[subgrid] sm:snap-center"
              key={day}
            >
              <div
                className={clsxm(
                  "pb-6 max-sm:font-bold max-sm:text-white sm:text-center",
                  isCurrent &&
                    "relative after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-12 after:-translate-x-1/2 after:rounded-t-full after:bg-green-500 max-sm:after:hidden sm:text-green-500",
                )}
              >
                <h3>
                  {day.slice(0, 3)}
                  <span className="sm:hidden">{day.slice(3)}</span>
                </h3>
                <div className="text-3xl font-bold max-sm:hidden">
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
                        day === "Monday" && "sm:pl-0",
                        day === "Sunday" && "sm:pr-0",
                      )}
                    >
                      <AddTask
                        status="SCHEDULED"
                        className="h-full rounded-md border bg-slate-800 px-3 py-2 opacity-0 transition-opacity duration-300 focus-within:opacity-100 hover:opacity-50 focus-within:hover:opacity-100"
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
