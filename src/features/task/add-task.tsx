import { createId } from "@paralleldrive/cuid2";
import type { TaskStatus } from "@prisma/client";
import { toast } from "react-toastify";

import { BaseTask, type BaseTaskProps, type TaskSubmitFunction } from "./task";
import { useUpsertTask } from "./use-upsert-task";

type AddTaskProps = Omit<BaseTaskProps, "onSubmit"> & {
  status: TaskStatus;
  scheduledDate?: Date;
  scheduledOrder?: number;
};

const AddTask = ({
  status,
  scheduledDate,
  scheduledOrder,
  ...rest
}: AddTaskProps) => {
  const upsertTask = useUpsertTask({ status });

  const handleCreateTask: TaskSubmitFunction = async (
    { title },
    textareaRef,
    setTitle,
  ) => {
    if (!title) return;

    const prevValue = title;
    setTitle("");

    try {
      await upsertTask.mutateAsync({
        id: createId(),
        title,
        status,
        scheduledDate,
        scheduledOrder,
      });
      textareaRef.current?.focus();
    } catch (e) {
      setTitle(prevValue);
      toast.error("Unable to create task, please try again or contact support");
    }
  };

  return (
    <BaseTask
      label="Add task"
      onSubmit={handleCreateTask}
      isPlaceholder
      {...rest}
    />
  );
};

export { AddTask };
