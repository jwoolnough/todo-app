import { toast } from "sonner";

import { ContextMenuItem } from "~/components";

import { api } from "~/trpc/react";

import { useTaskContext } from "../context";

const DeleteMenuItem = () => {
  const utils = api.useUtils();
  const { id } = useTaskContext();
  const deleteTask = api.task.delete.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.taskList.getAll.invalidate(),
        utils.task.getByWeek.invalidate(),
      ]);
    },
  });

  const handleClick = async () => {
    try {
      await deleteTask.mutateAsync(id);
    } catch {
      toast.error("Unable to delete task");
    }
  };

  return <ContextMenuItem onClick={handleClick}>Delete</ContextMenuItem>;
};

export { DeleteMenuItem };
