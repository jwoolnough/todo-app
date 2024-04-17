"use client";

import { addWeeks, isThisWeek, subWeeks } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Button, IconButton } from "~/components";

import { useDateQuery } from "../hooks/use-date-query";

const ScheduleNav = () => {
  const { selectedDate, setSelectedDate } = useDateQuery();

  return (
    <nav className="ml-auto">
      <ul className="flex items-center">
        <AnimatePresence>
          {!isThisWeek(selectedDate) && (
            <motion.li
              className="mr-2 max-sm:hidden"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
            >
              <Button
                onClick={() => void setSelectedDate(new Date())}
                size="sm"
              >
                Go to today
              </Button>
            </motion.li>
          )}
        </AnimatePresence>
        <li>
          <IconButton
            onClick={() => {
              void setSelectedDate(subWeeks(selectedDate, 1));
            }}
            label="Previous week"
            variant="link"
            size="sm"
          >
            <FiChevronLeft size={20} />
          </IconButton>
        </li>
        <li>
          <IconButton label="Calendar" variant="link" size="sm">
            <FiCalendar size={18} />
          </IconButton>
        </li>
        <li>
          <IconButton
            onClick={() => {
              void setSelectedDate(addWeeks(selectedDate, 1));
            }}
            label="Next week"
            variant="link"
            size="sm"
          >
            <FiChevronRight size={20} />
          </IconButton>
        </li>
      </ul>
    </nav>
  );
};

export { ScheduleNav };
