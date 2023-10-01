import type { TaskStatus } from "@prisma/client";

import { api } from "@/utils/api";

type UseDeleteTaskInput = {
  status: TaskStatus;
};

/** Handle deleting tasks with optimistic UI updates */
const useDeleteTask = ({ status }: UseDeleteTaskInput) => {
  const utils = api.useContext();

  const deleteTask = api.task.deleteTask.useMutation({
    async onMutate(deleteTaskId) {
      await utils.task.getMyTasksByStatus.cancel({ status });
      await utils.task.getTotalUnscheduledTasksCount.cancel();

      const prevTaskListData = utils.task.getMyTasksByStatus.getData({
        status,
      });
      const prevUnscheduledCount =
        utils.task.getTotalUnscheduledTasksCount.getData();

      utils.task.getMyTasksByStatus.setData({ status }, (old = []) => {
        return old.filter((item) => item.id !== deleteTaskId);
      });
      utils.task.getTotalUnscheduledTasksCount.setData(
        undefined,
        (old = 0) => old - 1,
      );

      return {
        prevTaskListData,
        prevUnscheduledCount,
      };
    },
    onError(_err, _newPost, ctx) {
      utils.task.getMyTasksByStatus.setData({ status }, ctx?.prevTaskListData);
      utils.task.getTotalUnscheduledTasksCount.setData(
        undefined,
        ctx?.prevUnscheduledCount,
      );
    },
    onSettled() {
      void utils.task.getMyTasksByStatus.invalidate({ status });
      void utils.task.getTotalUnscheduledTasksCount.invalidate();
    },
  });

  return deleteTask;
};

export { useDeleteTask };
