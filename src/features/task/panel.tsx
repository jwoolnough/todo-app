import { FiPlus } from "react-icons/fi";

import { IconButton } from "@/components/button";

import { TaskCategory } from "./panel/category";

const TaskPanel = () => {
  return (
    <aside className="grid grid-rows-[subgrid] max-sm:hidden sm:row-span-full">
      <div className="flex items-center gap-4 px-4 py-6">
        <h3 className="text-lg font-bold text-white">Tasks</h3>
        <IconButton variant="secondary" size="sm" label="Add task">
          <FiPlus size={18} />
        </IconButton>
      </div>

      <div className="flex flex-grow flex-col">
        <TaskCategory
          category="TODO_THIS_WEEK"
          title="This week"
          isOpenByDefault
        />
        <TaskCategory category="TODO_THIS_MONTH" title="This month" />
        <TaskCategory category="TODO_AT_SOME_POINT" title="At some point" />
      </div>
    </aside>
  );
};

export { TaskPanel };
