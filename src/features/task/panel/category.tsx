import { useState } from "react";

import { Accordion } from "@/components/accordion";
import { Count } from "@/components/count";

import { api } from "@/utils/api";

import type { TaskStatus } from "@/constants/task";

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
  const { data, isFetching } = api.task.getMyTasksByStatus.useQuery({
    status: category,
  });
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  // TODO:
  // if (isFetching) return "Loading...";

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
      {data?.map((task) => <div key={task.id}>{task.title}</div>)}

      <AddTask status={category} />
    </Accordion>
  );
};

export { TaskCategory };
