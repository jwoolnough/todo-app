"use client";

import type { TaskList } from "@prisma/client";
import { toast } from "sonner";

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

  const handleSubmit: TaskSubmitFunction = async ({ title }, _, setTitle) => {
    if (!title) {
      toast.error("Task title is required");
      return;
    }

    try {
      await createInList.mutateAsync({
        title,
        taskListId,
      });
    } catch {
      toast.error("Unable to create task");
    }

    setTitle("");
  };

  return (
    <BaseTask
      onSubmit={handleSubmit}
      hideDescription
      isDraggable={false}
      isPlaceholder
      className="bg-opacity-50"
    />
  );
};

export { AddSidebarTask };
