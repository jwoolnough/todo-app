import type { TaskStatus } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Accordion } from "@/components/accordion";
import { Count } from "@/components/count";
import { Spinner } from "@/components/spinner";
import { Wrap } from "@/components/wrap";

import { api } from "@/utils/api";

import { Task } from "../task";
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
      <Wrap
        if={taskCount > 0}
        wrapper={(children) => (
          <ul className="-mt-1 flex flex-col">
            <AnimatePresence initial={false}>{children}</AnimatePresence>
          </ul>
        )}
      >
        {isInitialLoading && <Spinner className="mx-auto mb-4" />}

        {data?.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Task
              task={task}
              className="-mx-2 rounded-sm px-2 py-1 text-sm text-white transition focus-within:bg-slate-800 hover:bg-slate-800"
            />
          </motion.li>
        ))}
      </Wrap>

      {!isInitialLoading && <AddTask status={category} />}
    </Accordion>
  );
};

export { TaskCategory };
