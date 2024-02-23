import { TIMES_OF_DAY } from "@/constants/time";

import styles from "./style.module.css";
import { TimeBar, TimeIndicator } from "./time-indicator";

const StickySidebar = () => {
  return (
    <>
      <div className={styles.stickySidebar}>
        {/* Occupy the first row with blank div - simpler than offsetting the row-start below via array index */}
        <div role="presentation"></div>

        {TIMES_OF_DAY.map((timeOfDay) => (
          <div
            key={timeOfDay}
            className="relative row-span-4 text-right text-3xs uppercase before:absolute before:right-0 before:top-0 before:w-10 before:border-t before:border-slate-900 sm:text-2xs"
          >
            <span className="absolute right-0 top-[1px] -translate-y-1/2 pr-2">
              {timeOfDay}
            </span>
          </div>
        ))}

        <TimeIndicator />
      </div>

      <TimeBar />
    </>
  );
};

export { StickySidebar };
