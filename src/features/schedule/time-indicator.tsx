import {
  format,
  getHours,
  getMilliseconds,
  getMinutes,
  getSeconds,
} from "date-fns";
import { useEffect, useState } from "react";

import { clsxm } from "@/utils/clsxm";

const getTopPercentage = () => {
  const now = new Date();

  const hoursOfDay = getHours(now);
  const minutesOfHour = getMinutes(now);

  return ((hoursOfDay * 60 + minutesOfHour - 8 * 60) / (12 * 60)) * 100;
};

const useTimePosition = () => {
  const [time, setTime] = useState(format(new Date(), "H:mm"));
  const [topPercentage, setTopPercentage] = useState(getTopPercentage());

  useEffect(() => {
    let timeout: NodeJS.Timer;

    // Update the position and time each minute
    const tick = () => {
      clearTimeout(timeout);

      // get ms remaining until next minute
      const now = new Date();
      const ms = 60000 - (getSeconds(now) * 1000 + getMilliseconds(now));

      setTopPercentage(getTopPercentage());
      setTime(format(now, "H:mm"));

      timeout = setTimeout(tick, ms);
    };

    tick();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return { time, topPercentage };
};

const TimeWrapper = ({ children }: React.PropsWithChildren) => (
  <div className="pointer-events-none absolute inset-0 col-span-full row-start-2 row-end-[14]">
    {children}
  </div>
);

const TimeIndicator = () => {
  const { time, topPercentage } = useTimePosition();

  return (
    <TimeWrapper>
      <span
        className={clsxm(
          "absolute right-0 -translate-y-1/2 bg-gradient-to-b from-transparent via-slate-900 to-transparent py-4 pr-2 text-2xs text-green-500",
          "after:absolute after:left-full after:top-1/2 after:h-[9px] after:-translate-y-1/2 after:border-l after:border-current",
        )}
        style={
          topPercentage > 0 && topPercentage < 100
            ? { top: `${topPercentage}%` }
            : { display: "none" }
        }
        suppressHydrationWarning
      >
        {time}
      </span>
    </TimeWrapper>
  );
};

const TimeBar = () => {
  const { topPercentage } = useTimePosition();

  return (
    <TimeWrapper>
      <div
        className="absolute left-0 right-0 border-t border-green-500"
        style={
          topPercentage > 0 && topPercentage < 100
            ? { top: `${topPercentage}%` }
            : { display: "none" }
        }
        role="presentation"
      ></div>
    </TimeWrapper>
  );
};

export { TimeIndicator, TimeWrapper, TimeBar };
