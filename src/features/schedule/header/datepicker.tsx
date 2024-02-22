import { useRef, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { useOnClickOutside } from "usehooks-ts";

import { IconButton } from "@/components/button";
import { Calendar } from "@/components/calendar";
import { Tippy } from "@/components/tippy";

import { clsxm } from "@/utils/clsxm";

import { useDateQuery } from "./use-date-query";

const DatePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);
  const { selectedDate, setSelectedDate } = useDateQuery();

  useOnClickOutside(calendarRef, () => {
    setIsOpen(false);
  });

  const handleSelect = async (value?: Date) => {
    await setSelectedDate(value);

    setIsOpen(false);
  };

  return (
    <Tippy
      visible={isOpen}
      placement="bottom"
      interactive
      appendTo="parent"
      className="text-md z-10 [&>.tippy-content]:p-2"
      content={
        <div ref={calendarRef}>
          <Calendar
            mode="single"
            classNames={{
              head_cell: clsxm("mb-1 w-10"),
              row: clsxm(
                "flex w-full rounded-full transition-colors hover:bg-slate-950/20",
              ),
              cell: clsxm("p-[2px] text-xs font-bold"),
            }}
            selected={selectedDate}
            onSelect={(value) => void handleSelect(value)}
          />
        </div>
      }
    >
      <IconButton
        variant="link"
        type="button"
        label="Choose date"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiCalendar size={22} />
      </IconButton>
    </Tippy>
  );
};

export { DatePicker };
