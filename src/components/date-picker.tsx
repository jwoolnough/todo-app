"use client";

import { type SelectSingleEventHandler } from "react-day-picker";

import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type DatePickerProps = React.PropsWithChildren<{
  value?: Date;
  onChange?: SelectSingleEventHandler;
  calendarProps?: React.ComponentProps<typeof Calendar>;
}>;

const DatePicker = ({
  children,
  value,
  onChange,
  calendarProps,
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          // @ts-expect-error For now we just need to handle single mode
          onSelect={onChange}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
