import { format } from "date-fns";

import { Days } from "./days";
import { Nav } from "./nav";

type ScheduleHeaderProps = {
  startOfWeekDate: Date;
};

const ScheduleHeader = ({ startOfWeekDate }: ScheduleHeaderProps) => {
  return (
    <header className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-4">
          <h1 className="text-lg font-bold leading-tight text-white md:text-2xl">
            {format(startOfWeekDate, "MMMM Y")}
          </h1>
          <h2 className="text-lg leading-tight">
            Week {format(startOfWeekDate, "w")}
          </h2>
        </div>

        <Nav />
      </div>

      <Days startOfWeekDate={startOfWeekDate} />
    </header>
  );
};

export { ScheduleHeader };
