import { DayPicker } from "react-day-picker";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { clsxm } from "@/utils/clsxm";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={clsxm("p-0 text-center", className)}
      classNames={{
        months: clsxm(
          "flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0",
        ),
        month: clsxm("space-y-4"),
        caption: clsxm(
          "relative flex items-center justify-center pt-1 font-bold text-green-400",
        ),
        caption_label: clsxm("font-medium"),
        nav: clsxm("flex items-center space-x-1"),
        nav_button: clsxm("text-slate-400 transition-colors hover:text-white"),
        nav_button_previous: clsxm("absolute left-1"),
        nav_button_next: clsxm("absolute right-1"),
        table: clsxm("w-full border-collapse space-y-1"),
        head_row: clsxm("flex"),
        head_cell: clsxm("w-9 rounded-md font-medium text-white"),
        row: clsxm("mt-1 flex w-full"),
        cell: clsxm("p-0 text-xs font-bold"),
        day: clsxm(
          "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/10 hover:text-white",
        ),
        day_selected: clsxm("bg-green-500 text-white"),
        day_today: clsxm("[&:not([aria-selected])]:text-green-400"),
        day_outside: clsxm("font-normal text-slate-400 text-opacity-30"),
        day_disabled: clsxm("text-slate-400"),
        day_range_middle: clsxm(""),
        day_hidden: clsxm("invisible"),
        ...classNames,
      }}
      components={{
        IconLeft: () => <FiChevronLeft size={22} />,
        IconRight: () => <FiChevronRight size={22} />,
      }}
      weekStartsOn={1}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
export type { CalendarProps };
