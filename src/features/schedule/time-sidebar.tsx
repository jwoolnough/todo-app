import { cn } from "~/utils";

import { TimeIndicator } from "./time-indicator";

const TIMES = [
  "8",
  "9",
  "10",
  "11",
  "PM",
  "13",
  "14",
  "15",
  "16",
  "17",
  "EVE",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
] as const;

const TimeSidebar = () => {
  return (
    <div className="sticky left-0 z-10 row-start-2 row-end-[-1] mt-[calc(var(--gap)*-1)] grid grid-rows-subgrid border-r bg-navy-950 pt-[var(--gap)] text-right text-sm">
      {TIMES.map((time) => (
        <div
          className={cn(
            "row-span-2 px-3 md:pl-4",
            ["PM", "EVE"].includes(time) && "text-white",
          )}
          key={time}
        >
          <div className="mt-[calc(var(--gap)*-1/2)] [:not(:first-child)>&]:-translate-y-1/2">
            {time}
          </div>
        </div>
      ))}

      <TimeIndicator />
    </div>
  );
};

export { TimeSidebar };
