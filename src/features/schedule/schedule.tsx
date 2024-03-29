import { addDays, format, isSameDay, isToday } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

import { Box } from "@/components/box";
import { Spinner } from "@/components/spinner";

import { api } from "@/utils/api";
import { clsxm } from "@/utils/clsxm";
import { shuffleArray } from "@/utils/shuffle-array";

import { DAYS, TIMES_OF_DAY } from "@/constants/time";

import { Task } from "../task";
import { AddTask } from "../task/add-task";
import { Cell } from "./cell";
import { DayHeader } from "./day-header";
import { StickySidebar } from "./sticky-sidebar";
import styles from "./style.module.css";

const CELLS_PER_TIME_OF_DAY = 4;

const SCHEDULE_TASK_CLASSNAMES =
  "h-full rounded-md border bg-slate-800 [--task-padding-inline:0.75rem] [--task-padding-block:0.5rem]";

type ScheduleProps = {
  startOfWeekDate: Date;
};

// TODO: This component is massive and needs splitting out - to be actioned
// when drag and drop scheduling is implemented
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
    <main className="relative mr-2 grid">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          >
            <Spinner />
          </motion.div>
        )}
      </AnimatePresence>
      <Box
        ref={scrollerRef}
        className={clsxm(
          "snap-x overflow-auto pl-10 pt-4 [container-type:inline-size] max-sm:ml-2 sm:mb-2",
        )}
      >
        <div className={styles.grid}>
          <StickySidebar />

          {DAYS.map((day, i) => {
            const dayDate = addDays(startOfWeekDate, i);

            return (
              <div
                id={`${day.toLowerCase()}`}
                className={clsxm(
                  "row-span-full grid snap-end grid-rows-subgrid transition-colors sm:snap-align-none",
                )}
                key={day}
              >
                <DayHeader day={day} dayDate={dayDate} />

                {TIMES_OF_DAY.map((timeOfDay, sectionIndex) => (
                  <div
                    key={`${day}-${timeOfDay}`}
                    className={clsxm(
                      "relative row-span-4 grid grid-rows-subgrid border-t border-slate-700 py-1",
                      isToday(dayDate) && "sm:bg-white sm:bg-opacity-[0.01]",
                    )}
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
                                      cellTask.completed &&
                                        styles.completedTask,
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
    </main>
  );
};

export { Schedule };
