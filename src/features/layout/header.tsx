import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
} from "react-icons/fi";

import { IconButton, Input } from "~/components";

const Header = () => {
  return (
    <header className="flex items-center gap-4 px-6 py-4">
      <h1>March 2024</h1>
      <p>Week 11</p>

      {/* TODO: Implement search */}
      {false && (
        <form className="relative ml-2 max-w-[36rem] grow max-md:hidden">
          <label className="sr-only">Search</label>
          <Input
            type="search"
            id="search"
            accessKey="s"
            placeholder="Search for a task, event or date"
            className="pr-9"
          />

          <IconButton
            label="Search"
            type="submit"
            withTooltip={false}
            className="absolute right-0 top-0"
            variant="link"
          >
            <FiSearch size={18} />
          </IconButton>
        </form>
      )}

      <nav className="ml-auto">
        <ul className="flex">
          <li>
            <IconButton label="Previous week" variant="link" size="sm">
              <FiChevronLeft size={20} />
            </IconButton>
          </li>
          <li>
            <IconButton label="Calendar" variant="link" size="sm">
              <FiCalendar size={18} />
            </IconButton>
          </li>
          <li>
            <IconButton label="Next week" variant="link" size="sm">
              <FiChevronRight size={20} />
            </IconButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
