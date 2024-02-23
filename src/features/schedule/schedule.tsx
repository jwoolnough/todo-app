import { addDays, format, isPast, isSameDay, isToday } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

import { Box } from "@/components/box";

import { api } from "@/utils/api";
import { clsxm } from "@/utils/clsxm";
import { shuffleArray } from "@/utils/shuffle-array";

import { DAYS, TIMES_OF_DAY } from "@/constants/time";

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
  const { data, isLoading } = api.task.getTasksByWeek.useQuery({
    startOfWeekDate,
  });
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Scroll today into view
  useEffect(() => {
    if (window.location.hash !== "") return;

    const now = new Date();
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

  const shuffledTasks = data && shuffleArray(data);

  return (
    <Box
      as="main"
      ref={scrollerRef}
      className={clsxm(
        "mr-2 grid snap-x overflow-auto pl-10 pt-4 [container-type:inline-size] max-sm:ml-2 sm:mb-2",
      )}
    >
      <div className={styles.grid}>
        <div className={styles.stickySidebar}>
          {/* Occupy the first row with blank div - simpler than offsetting the row-start below via array index */}
          <div role="presentation"></div>

          {TIMES_OF_DAY.map((timeOfDay) => (
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

        {DAYS.map((day, i) => {
          const dayDate = addDays(startOfWeekDate, i);

          return (
            <div
              id={`${day.toLowerCase()}`}
              className="row-span-full grid snap-end grid-rows-subgrid sm:snap-align-none"
              key={day}
            >
              <div
                className={clsxm(
                  "pb-4 text-white max-sm:font-bold sm:text-center",
                  isPast(dayDate) && "sm:text-slate-400",
                  isToday(dayDate) &&
                    "relative after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-12 after:-translate-x-1/2 after:rounded-t-full after:bg-green-500 max-sm:after:hidden sm:text-green-500",
                )}
              >
                <h3 className="text-md leading-tight text-white">
                  {day.slice(0, 3)}
                  <span className="sm:hidden">{day.slice(3)}</span>
                </h3>
                <div className="text-2xl font-medium leading-tight max-sm:hidden">
                  {format(dayDate, "d")}
                </div>
              </div>

              {TIMES_OF_DAY.map((timeOfDay, sectionIndex) => (
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

                      const shuffledIndex =
                        shuffledTasks?.findIndex(
                          ({ id }) => id === cellTask?.id,
                        ) ?? 0;

                      return (
                        <Cell
                          key={`${day}-${timeOfDay}-${positionIndex}`}
                          className={clsxm(
                            positionIndex === 0 && "border-none",
                            day === "Monday" && "sm:pl-0",
                            day === "Sunday" && "sm:pr-0",
                          )}
                        >
                          <AnimatePresence mode="wait">
                            {cellTask ? (
                              <motion.div
                                className="relative h-full"
                                key={cellTask.id}
                                initial={{ opacity: 0 }}
                                animate={{
                                  opacity: 1,
                                  transition: {
                                    // Stagger the cards in by the shuffled data array's index
                                    delay: 0.05 * shuffledIndex,
                                    duration: 0.4,
                                  },
                                }}
                                exit={{ opacity: 0 }}
                              >
                                <Task
                                  task={cellTask}
                                  className={clsxm(
                                    SCHEDULE_TASK_CLASSNAMES,
                                    cellTask.completed && styles.completedTask,
                                  )}
                                />
                              </motion.div>
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
                          </AnimatePresence>
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
