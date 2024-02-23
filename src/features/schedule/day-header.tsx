import { format, isPast, isToday } from "date-fns";

import { clsxm } from "@/utils/clsxm";

import type { Day } from "@/constants/time";

type DayHeaderProps = {
  dayDate: Date;
  day: Day;
};

const DayHeader = ({ day, dayDate }: DayHeaderProps) => {
  return (
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
  );
};

export { DayHeader };
