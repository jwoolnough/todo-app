import { addDays, format, isPast, isToday, startOfWeek } from "date-fns";
import React from "react";

import { Box } from "@/components/box";

import { clsxm } from "@/utils/clsxm";

import { AddTask, Task } from "../task";
import { TimeIndicator } from "./time-indicator";

const Schedule = () => {
  // const { data } = api.task.getTasksByWeek();

  const now = new Date();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
  const timesOfDay = ["AM", "PM", "Eve"];
  const startOfWeekDate = startOfWeek(now, { weekStartsOn: 1 });

  return (
    <Box as="main" className="mr-2 snap-x overflow-auto max-sm:ml-2 sm:mb-2">
      <div className="relative grid h-full w-max min-w-full grid-cols-[repeat(7,calc(100vw-4rem))] grid-rows-[min-content,repeat(12,minmax(3rem,1fr))] sm:ml-6 sm:grid-cols-[repeat(7,minmax(12.5rem,1fr))]">
        <TimeIndicator />
        {/* Put AM/PM/Eve here with grid span and position sticky */}

        {days.map((day, i) => {
          const dayDate = addDays(startOfWeekDate, i);
          const isCurrent = isToday(dayDate);
          const isPastDay = isPast(dayDate);

          return (
            <div
              className="row-span-full grid snap-center grid-rows-[subgrid]"
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
                  {i === 0 && (
                    <span className="text-2xs absolute right-full -mt-[1px] mr-2 -translate-y-1/2 uppercase">
                      {timeOfDay}
                    </span>
                  )}

                  <div>
                    <AddTask status="SCHEDULED" />
                  </div>
                  <div
                    className={clsxm(
                      "border-t p-1",
                      day === "Mon" && "pl-0",
                      day === "Sun" && "pr-0",
                    )}
                  >
                    <Task
                      task={{
                        id: "f2vkrtt1v442eczhsgtu4xux",
                        userId: "cln36pock0000u2ar69r67l1l",
                        title: "Feed cat",
                        notes: null,
                        status: "TODO_THIS_WEEK",
                        unscheduledOrder: null,
                        scheduledDate: null,
                        scheduledOrder: null,
                        completed: false,
                        completedAt: null,
                        createdAt: "2023-10-04T07:52:03.151Z",
                        updatedAt: "2023-10-04T07:52:03.151Z",
                      }}
                      className="h-full rounded-sm border bg-slate-800 px-3 py-2"
                    />
                  </div>
                  <div
                    className={clsxm(
                      "border-t p-1",
                      day === "Mon" && "pl-0",
                      day === "Sun" && "pr-0",
                    )}
                  >
                    <Task
                      task={{
                        id: "f2vkrtt1v442eczhsgtu4xux",
                        userId: "cln36pock0000u2ar69r67l1l",
                        title: "Feed cat",
                        notes: null,
                        status: "TODO_THIS_WEEK",
                        unscheduledOrder: null,
                        scheduledDate: null,
                        scheduledOrder: null,
                        completed: false,
                        completedAt: null,
                        createdAt: "2023-10-04T07:52:03.151Z",
                        updatedAt: "2023-10-04T07:52:03.151Z",
                      }}
                      className="h-full rounded-sm border bg-slate-800 px-3 py-2"
                    />
                  </div>
                  <div className="border-b border-t">
                    {/* <AddTask status="SCHEDULED" /> */}
                  </div>
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
