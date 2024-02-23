import { addWeeks, isThisWeek, subWeeks } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Button, IconButton } from "@/components/button";

import { DatePicker } from "./datepicker";
import { useDateQuery } from "./use-date-query";

const Nav = () => {
  const { selectedDate, setSelectedDate } = useDateQuery();

  return (
    <ul className="flex items-center">
      <AnimatePresence>
        {!isThisWeek(selectedDate) && (
          <motion.li
            className="ml-2 max-sm:hidden"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <Button onClick={() => void setSelectedDate(new Date())} size="sm">
              Go to today
            </Button>
          </motion.li>
        )}
      </AnimatePresence>
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
