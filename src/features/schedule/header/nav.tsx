import { addWeeks, isThisWeek, subWeeks } from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Button, IconButton } from "@/components/button";

import { DatePicker } from "./datepicker";
import { useDateQuery } from "./use-date-query";

const Nav = () => {
  const { selectedDate, setSelectedDate } = useDateQuery();

  return (
    <ul className="flex items-center">
      {!isThisWeek(selectedDate) && (
        <li className="ml-2 max-sm:hidden">
          <Button onClick={() => void setSelectedDate(new Date())} size="sm">
            Go to today
          </Button>
        </li>
      )}
      <li className="leading-none">
        <IconButton
          onClick={() => {
            void setSelectedDate(subWeeks(selectedDate, 1));
          }}
          variant="link"
          type="button"
          label="Previous week"
        >
          <FiChevronLeft size={22} />
        </IconButton>
      </li>
      <li className="leading-none">
        <DatePicker />
      </li>
      <li className="leading-none">
        <IconButton
          onClick={() => {
            void setSelectedDate(addWeeks(selectedDate, 1));
          }}
          variant="link"
          type="button"
          label="Next week"
        >
          <FiChevronRight size={22} />
        </IconButton>
      </li>
    </ul>
  );
};

export { Nav };
