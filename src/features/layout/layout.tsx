import {
  DragOverlay as BaseDragOverlay,
  DndContext,
  useDndContext,
} from "@dnd-kit/core";
import type { Task as TaskType } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { Task } from "../task";
import { DraggableItem } from "../task/draggable-item";
import { TaskPanel } from "../task/panel";
import { Nav } from "./nav";

const DragOverlay = () => {
  const { active, ...rest } = useDndContext();

  // If active is not null, it will only ever be a Task so this should be safe
  const task = active?.data.current?.task as TaskType;
  console.log(!!task);

  // return null;

  return <BaseDragOverlay>{task && <Task task={task} />}</BaseDragOverlay>;
};

const Layout = ({ children }: WithChildren) => {
  const pathname = usePathname();

  return (
    <DndContext onDragEnd={(e) => console.log(e)}>
      <div className="grid h-[100dvh] max-sm:grid-rows-[minmax(0,1fr)_min-content] sm:grid-cols-[3.75rem_16.25rem_minmax(0,1fr)] sm:grid-rows-[min-content_minmax(0,1fr)] sm:gap-x-2">
        <Nav />

        <TaskPanel />

        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            className="grid grid-rows-[min-content,minmax(0,1fr)] sm:row-span-full sm:grid-rows-subgrid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      <DragOverlay />
    </DndContext>
  );
};

export { Layout };
