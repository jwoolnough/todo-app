import { addDays, format, isPast, isSameDay, isToday } from "date-fns";
import React, { useEffect, useRef } from "react";

import { Box } from "@/components/box";

import { api } from "@/utils/api";
import { clsxm } from "@/utils/clsxm";

import { Task } from "../task";
import { AddTask } from "../task/add-task";
import { Cell } from "./cell";
import styles from "./style.module.css";
import { TimeBar, TimeIndicator } from "./time-indicator";

const CELLS_PER_TIME_OF_DAY = 4;

const SCHEDULE_TASK_CLASSNAMES =
  "h-full rounded-md border bg-slate-800 px-3 py-2";

type ScheduleProps = {
  startOfWeekDate: Date;
};

const Schedule = ({ startOfWeekDate }: ScheduleProps) => {
  const { data } = api.task.getTasksByWeek.useQuery({ startOfWeekDate });
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
      className={clsxm(
        "mr-2 grid snap-x overflow-auto pl-10 [container-type:inline-size] max-sm:ml-2 sm:mb-2",
      )}
    >
      <div className={styles.grid}>
        <div className={styles.stickySidebar}>
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

        <TimeBar />

        {days.map((day, i) => {
          const dayDate = addDays(startOfWeekDate, i);

          return (
            <div
              id={`${day.toLowerCase()}`}
              className="row-span-full grid snap-end grid-rows-subgrid sm:snap-center"
              key={day}
            >
              <div
                className={clsxm(
                  "pb-6 text-white max-sm:font-bold sm:text-center",
                  isPast(dayDate) && "sm:text-slate-400",
                  isToday(dayDate) &&
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

              {timesOfDay.map((timeOfDay, sectionIndex) => (
                <div
                  key={`${day}-${timeOfDay}`}
                  className="relative row-span-4 grid grid-rows-subgrid border-t border-slate-700 py-1"
                >
                  {Array.from(
                    { length: CELLS_PER_TIME_OF_DAY },
                    (_, positionIndex) => {
                      const scheduledOrder =
                        sectionIndex * CELLS_PER_TIME_OF_DAY + positionIndex;

                      const cellTask = data?.find((task) => {
                        if (!task.scheduledDate) return false;

                        return (
                          isSameDay(task.scheduledDate, dayDate) &&
                          task.scheduledOrder === scheduledOrder
                        );
                      });

                      return (
                        <Cell
                          key={`${day}-${timeOfDay}-${positionIndex}`}
                          className={clsxm(
                            positionIndex === 0 && "border-none",
                            day === "Monday" && "sm:pl-0",
                            day === "Sunday" && "sm:pr-0",
                          )}
                        >
                          {cellTask ? (
                            <Task
                              task={cellTask}
                              className={clsxm(
                                SCHEDULE_TASK_CLASSNAMES,
                                cellTask.completed && " bg-green-800",
                              )}
                            />
                          ) : (
                            <AddTask
                              status="SCHEDULED"
                              className={clsxm(
                                styles.addTask,
                                SCHEDULE_TASK_CLASSNAMES,
                                "opacity-0 duration-300 focus-within:opacity-100 hover:opacity-100",
                              )}
                              scheduledDate={dayDate}
                              scheduledOrder={
                                sectionIndex * CELLS_PER_TIME_OF_DAY +
                                positionIndex
                              }
                            />
                          )}
                        </Cell>
                      );
                    },
                  )}
                </div>
              ))}
            </div>
          );
        })}
        <div className={styles.stickyEnd} role="presentation"></div>
      </div>
    </Box>
  );
};

export { Schedule };
