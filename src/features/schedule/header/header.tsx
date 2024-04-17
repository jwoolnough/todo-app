import { FiSearch } from "react-icons/fi";

import { Header } from "~/features/layout";

import { IconButton, Input } from "~/components";

import { ScheduleNav } from "./nav";
import { ScheduleTitle } from "./title";

const ScheduleHeader = () => {
  return (
    <Header>
      <ScheduleTitle />

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

      <ScheduleNav />
    </Header>
  );
};

export { ScheduleHeader };
