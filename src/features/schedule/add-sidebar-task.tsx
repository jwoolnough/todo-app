"use client";

import type { TaskList } from "@prisma/client";
import { toast } from "sonner";

import { useGridStackContext } from "~/components/gridstack";

import { api } from "~/trpc/react";

import { BaseTask, type TaskSubmitFunction } from "../task";

type AddSidebarTaskProps = {
  taskListId: TaskList["id"];
};

const AddSidebarTask = ({ taskListId }: AddSidebarTaskProps) => {
  const utils = api.useUtils();
  const createInList = api.task.createInList.useMutation({
    onSuccess: async () => {
      await utils.taskList.getAll.invalidate();
    },
  });
  const { addWidget } = useGridStackContext();

  const handleSubmit: TaskSubmitFunction = async ({ title }, _, setTitle) => {
    if (!title) {
      toast.error("Task title is required");
      return;
    }

    try {
      const task = await createInList.mutateAsync({
        title,
        taskListId,
      });

      addWidget(() => ({
        x: 0,
        y: task.order,
        id: task.id,
        content: JSON.stringify({
          name: "Task",
          props: { task, hideDescription: true },
        }),
      }));
    } catch {
      toast.error("Unable to create task");
    }

    setTitle("");
  };

  return (
    <BaseTask
      onSubmit={handleSubmit}
      hideDescription
      className="mt-1 bg-opacity-50"
    />
  );
};

export { AddSidebarTask };
