import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import type { TaskStatus } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Accordion } from "@/components/accordion";
import { Count } from "@/components/count";
import { Spinner } from "@/components/spinner";

import { api } from "@/utils/api";

import { DraggableItem } from "../draggable-item";
import { AddTask, Task } from "../task";

type TaskCategoryProps = {
  title: string;
  category: TaskStatus;
  isOpenByDefault?: boolean;
};

const CATEGORY_TASK_CLASSNAMES =
  "-mx-2 rounded-sm px-2 py-1 text-sm text-white transition focus-within:bg-slate-800 hover:bg-slate-800";

const TaskCategory = ({
  title,
  category,
  isOpenByDefault = false,
}: TaskCategoryProps) => {
  const { data, isInitialLoading } = api.task.getMyTasksByStatus.useQuery({
    status: category,
  });
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const taskCount = data?.length ?? 0;

  return (
    <Accordion
      header={
        <>
          {title} {taskCount > 0 && <Count count={taskCount} />}
        </>
      }
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      boxProps={{ className: "px-4 py-3 mb-2" }}
    >
      {isInitialLoading && <Spinner className="mx-auto" />}
      <ul className="-mt-1 flex flex-col">
        <SortableContext items={data ?? []}>
          <AnimatePresence initial={false}>
            {data?.map((task) => (
              <DraggableItem key={task.id} id={task.id}>
                <Task task={task} className={CATEGORY_TASK_CLASSNAMES} />
              </DraggableItem>
            ))}
          </AnimatePresence>
        </SortableContext>
        {!isInitialLoading && (
          <li>
            <AddTask status={category} className={CATEGORY_TASK_CLASSNAMES} />
          </li>
        )}
      </ul>
    </Accordion>
  );
};

export { TaskCategory };
