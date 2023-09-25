import type { TaskStatus } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Accordion } from "@/components/accordion";
import { Check } from "@/components/check";
import { Count } from "@/components/count";
import { Wrap } from "@/components/wrap";

import { api } from "@/utils/api";

import { AddTask } from "./add-task";

type TaskCategoryProps = {
  title: string;
  category: TaskStatus;
  isOpenByDefault?: boolean;
};

const TaskCategory = ({
  title,
  category,
  isOpenByDefault = false,
}: TaskCategoryProps) => {
  const { data, isInitialLoading } =
    api.task.getMyTasksByStatus.useQuery({
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
      <Wrap
        if={taskCount > 0}
        wrapper={(children) => (
          <ul className="flex flex-col">
            <AnimatePresence initial={false}>{children}</AnimatePresence>
          </ul>
        )}
      >
        {isInitialLoading && "Loading..."}
        {data?.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-white after:block after:h-1"
          >
            <div className="flex gap-2">
              <Check className="mt-0.5 shrink-0" />
              {task.title}
            </div>
          </motion.li>
        ))}
      </Wrap>

      <AddTask status={category} />
    </Accordion>
  );
};

export { TaskCategory };
