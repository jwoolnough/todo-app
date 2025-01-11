import { toast } from "sonner";

import { useGridStackContext } from "~/components/gridstack";

import { api } from "~/trpc/react";

import { ContextMenuItem } from "~/components";

import { useTaskContext } from "../context";

const DeleteMenuItem = () => {
  const { id } = useTaskContext();
  const { removeWidget, gridStack } = useGridStackContext();
  const deleteTask = api.task.delete.useMutation();

  console.log({ gridStack });

  const handleClick = async () => {
    try {
      await deleteTask.mutateAsync(id);
      gridStack?.batchUpdate();
      removeWidget(id);
      gridStack?.batchUpdate(false);
    } catch {
      toast.error("Unable to delete task");
    }
  };

  return <ContextMenuItem onClick={handleClick}>Delete</ContextMenuItem>;
};

export { DeleteMenuItem };
