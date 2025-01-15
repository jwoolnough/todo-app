import { cn } from "~/utils";

import { CreateInScheduleDialog } from "../task-dialog";
import { DayHeader } from "./day-header";
import { ScheduleDayPicker } from "./day-picker";
import { ScheduleGrid } from "./grid";
import { PastDays } from "./past-days";
import { TimeBar } from "./time-indicator";
import { TimeSidebar } from "./time-sidebar";

const Schedule = () => {
  return (
    <>
      <ScheduleDayPicker />
      <div className="relative grid w-min min-w-full grid-cols-[3rem_repeat(7,minmax(10rem,1fr))_1rem] grid-rows-[min-content_repeat(32,2rem)_1rem] gap-[var(--gap)] [--gap:0.3125rem] max-md:pb-14">
        <PastDays />

        <DayHeader />

        <TimeSidebar />

        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            style={{ gridRow: `${i * 2 + 2} / span 2` }}
            className={cn(
              "absolute inset-0 col-start-2 col-end-[-1] row-span-2 ml-[calc(var(--gap)*-1)] after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:border-b after:border-opaque",
              i !== 3 && i !== 9 && "after:border-light-opaque",
            )}
          ></div>
        ))}

        <TimeBar />

        <ScheduleGrid />

        <CreateInScheduleDialog />
      </div>
    </>
  );
};

export { Schedule };
