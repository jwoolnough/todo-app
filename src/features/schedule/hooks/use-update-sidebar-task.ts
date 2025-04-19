import type { TaskList } from "@prisma/client";

import { api } from "~/trpc/react";

/** Mutate sidebar tasks with optimistic updates */
const useUpdateSidebarTask = (taskListId: TaskList["id"]) => {
  const utils = api.useUtils();
  const updateTask = api.task.update.useMutation({
    async onMutate(updatedTask) {
      await utils.taskList.getAll.cancel();
      const prevData = utils.taskList.getAll.getData();

      utils.taskList.getAll.setData(undefined, (old) => {
        if (!old) {
          return old;
        }

        return old.map((list) => {
          if (list.id !== taskListId) {
            return list;
          }

          return {
            ...list,
            tasks: list.tasks.map((t) =>
              t.id === updatedTask.id
                ? {
                    ...t,
                    ...updatedTask,
                  }
                : t,
            ),
          };
        });
      });

      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onError(_err, _variables, context) {
      if (context?.prevData) {
        utils.taskList.getAll.setData(undefined, context.prevData);
      }
    },
    onSettled() {
      return utils.taskList.getAll.invalidate();
    },
  });

  return updateTask;
};

export { useUpdateSidebarTask };
