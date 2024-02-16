import type { TaskStatus } from "@prisma/client";

import { api } from "@/utils/api";

type UseDeleteTaskInput = {
  status: TaskStatus;
  startOfWeekDate?: Date;
};

/** Handle deleting tasks with optimistic UI updates */
const useDeleteTask = ({ status, startOfWeekDate }: UseDeleteTaskInput) => {
  const utils = api.useContext();

  const deleteTask = api.task.deleteTask.useMutation({
    async onMutate(deleteTaskId) {
      await utils.task.getMyTasksByStatus.cancel({ status });
      await utils.task.getTotalUnscheduledTasksCount.cancel();

      if (startOfWeekDate) {
        await utils.task.getTasksByWeek.cancel({ startOfWeekDate });
      }

      const prevTaskListData = utils.task.getMyTasksByStatus.getData({
        status,
      });
      const prevUnscheduledCount =
        utils.task.getTotalUnscheduledTasksCount.getData();
      const prevTasksByWeekData = utils.task.getTasksByWeek.getData();

      utils.task.getMyTasksByStatus.setData({ status }, (old = []) => {
        return old.filter((item) => item.id !== deleteTaskId);
      });
      utils.task.getTotalUnscheduledTasksCount.setData(
        undefined,
        (old = 0) => old - 1,
      );

      if (startOfWeekDate) {
        utils.task.getTasksByWeek.setData({ startOfWeekDate }, (old = []) => {
          return old.filter((item) => item.id !== deleteTaskId);
        });
      }

      return {
        prevTaskListData,
        prevUnscheduledCount,
        prevTasksByWeekData,
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
