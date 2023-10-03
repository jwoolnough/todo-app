import { useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { useOnClickOutside } from "usehooks-ts";

import { IconButton } from "@/components/button";

import { clsxm } from "@/utils/clsxm";

import { TaskCategory } from "./category";
import { usePanelStore } from "./use-panel-store";

const TaskPanel = () => {
  const { panelIsOpen, setPanelIsOpen } = usePanelStore();
  const panelRef = useRef<HTMLBaseElement>(null);

  useOnClickOutside(panelRef, (e) => {
    if (
      (e.target as Element).id === "panel-toggle" ||
      (e.target as Element).closest("#panel-toggle")
    ) {
      return;
    }

    if (panelIsOpen) {
      setPanelIsOpen(false);
    }
  });

  return (
    <aside
      ref={panelRef}
      className={clsxm(
        // TODO: Really regretting tailwind now... Refactor using CSS module
        "bottom-[60px] left-full top-0 z-10 border-slate-900 max-sm:fixed max-sm:w-[calc(100vw-3.75rem)] max-sm:max-w-[22.5rem] max-sm:border-l max-sm:bg-slate-950 max-sm:px-4 max-sm:transition-[transform,visibility] max-sm:duration-[500ms,0s]",
        "sm:row-span-full sm:grid sm:grid-rows-[subgrid]",
        panelIsOpen
          ? "max-sm:-translate-x-full max-sm:shadow-[0_0_24px_rgba(0,0,0,.75)]"
          : "max-sm:invisible max-sm:delay-[0s,500ms]",
      )}
    >
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
