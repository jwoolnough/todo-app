import { toast } from "sonner";

import { api } from "~/trpc/react";

import { ContextMenuItem } from "~/components";

import { useTaskContext } from "../context";

const DeleteMenuItem = () => {
  const utils = api.useUtils();
  const { id } = useTaskContext();
  const deleteTask = api.task.delete.useMutation({
    onSuccess: async () => {
      await utils.taskList.getAll.invalidate();
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
