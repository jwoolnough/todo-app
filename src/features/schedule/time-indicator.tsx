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

const TimeIndicator = () => {
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

  return (
    <div
      className={clsxm(
        "pointer-events-none absolute inset-0 col-span-full row-start-2 row-end-[14]",
      )}
    >
      <div
        className="absolute left-0 w-[100cqw] border-t border-current text-3xs text-green-500 before:absolute before:top-[-5px] before:h-[9px] before:border-l before:border-current sm:text-2xs"
        style={
          topPercentage > 0 && topPercentage < 100
            ? { top: `${topPercentage}%` }
            : { display: "none" }
        }
      >
        <span
          className="absolute right-full top-1/2 mr-2 -translate-y-1/2 bg-gradient-to-b from-transparent via-slate-900 to-transparent py-4"
          // Time can differ from server rendered version
          suppressHydrationWarning
        >
          {time}
        </span>
      </div>
    </div>
  );
};

export { TimeIndicator };
