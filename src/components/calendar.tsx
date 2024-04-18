"use client";

import { DayPicker } from "react-day-picker";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { cn } from "~/utils";

import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      weekStartsOn={1}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "relative flex items-center justify-center pt-1",
        caption_label: "font-medium text-white",
        nav: "flex items-center space-x-1",
        nav_button: cn(buttonVariants({ variant: "link" }), "h-7 w-7 p-0"),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "rounded-md w-8 font-regular text-navy-300",
        row: "mt-2 flex w-full",
        cell: "[&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md relative h-8 w-8 p-0 text-center text-sm focus-within:relative focus-within:z-20 last:[&:has([aria-selected])]:rounded-r-full [&:has([aria-selected].day-range-end)]:rounded-l-full",
        day: cn(
          buttonVariants({ variant: "link" }),
          "h-8 w-8 rounded-full p-0 font-bold text-navy-100 hover:bg-green-500/10 aria-selected:opacity-100",
        ),
        day_range_end: "day-range-end",
        day_selected: "!bg-green-500 shadow-neon aria-selected:text-black",
        day_today: "[&:not(aria-selected)]:text-green-500",
        day_outside: "day-outside opacity-25 aria-selected:opacity-30",
        day_disabled: "text-navy-300/50 opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <FiChevronLeft size={18} />,
        IconRight: () => <FiChevronRight size={18} />,
        // HeadRow: () =>
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
