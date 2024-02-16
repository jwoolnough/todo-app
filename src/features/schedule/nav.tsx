import { addDays, format, isPast, isToday } from "date-fns";

import { clsxm } from "@/utils/clsxm";

type ScheduleNavProps = {
  startOfWeekDate: Date;
};

const ScheduleNav = ({ startOfWeekDate }: ScheduleNavProps) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ] as const;

  return (
    <div className="mt-6 grid grid-cols-7 sm:hidden">
      {days.map((day, i) => {
        const dayDate = addDays(startOfWeekDate, i);

        return (
          <a
            href={`#${day.toLowerCase()}`}
            key={day}
            className={clsxm("text-center text-xs text-white")}
          >
            <div className="text-xs">{day.slice(0, 1)}</div>
            <div
              className={clsxm(
                "mx-auto mt-2 w-6 rounded-full font-bold leading-6 transition",
                isPast(dayDate) && "text-slate-400",
                isToday(dayDate) && "text-green-500",
                // TODO: Handle active state
                day === "Tuesday" && "bg-green-500 text-white",
              )}
            >
              {format(dayDate, "d")}
            </div>
          </a>
        );
      })}
    </div>
  );
};

export { ScheduleNav };
