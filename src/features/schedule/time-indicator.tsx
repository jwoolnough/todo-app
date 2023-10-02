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
  const [time, setTime] = useState(format(new Date(), "HH:mm"));
  const [topPercentage, setTopPercentage] = useState(getTopPercentage());

  useEffect(() => {
    let interval: NodeJS.Timer;

    // Update the position and time each minute
    const tick = () => {
      clearTimeout(interval);

      // get ms remaining until next minute
      const now = new Date();
      const ms = 60000 - (getSeconds(now) * 1000 + getMilliseconds(now));

      setTopPercentage(getTopPercentage());
      setTime(format(now, "HH:mm"));

      interval = setTimeout(tick, ms);
    };

    tick();

    return () => {
      clearTimeout(interval);
    };
  }, []);

  return (
    <div
      className={clsxm(
        "pointer-events-none absolute inset-0 row-start-2 row-end-[14]",
      )}
    >
      <div
        className="absolute left-0 right-0 border-t border-current text-xs text-green-500 before:absolute before:top-[-5px] before:h-[9px] before:border-l before:border-current"
        style={
          topPercentage > 0 && topPercentage < 100
            ? { top: `${topPercentage}%` }
            : { display: "block" }
        }
      >
        {time}
      </div>
    </div>
  );
};

export { TimeIndicator };
