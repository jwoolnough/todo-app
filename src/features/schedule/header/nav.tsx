import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { Button, IconButton } from "@/components/button";

const Nav = () => {
  return (
    <ul className="flex items-center">
      <li className="leading-none">
        <IconButton variant="link" type="button" label="Previous week">
          <FiChevronLeft size={22} />
        </IconButton>
      </li>
      <li className="leading-none">
        <IconButton variant="link" type="button" label="Choose date">
          <FiCalendar size={22} />
        </IconButton>
      </li>
      <li className="leading-none">
        <IconButton variant="link" type="button" label="Next week">
          <FiChevronRight size={22} />
        </IconButton>
      </li>
      <li className="ml-2 max-sm:hidden">
        <Button size="sm">Go to today</Button>
      </li>
    </ul>
  );
};

export { Nav };
