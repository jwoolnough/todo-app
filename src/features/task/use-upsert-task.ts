import type { TaskStatus } from "@prisma/client";
import { useSession } from "next-auth/react";

import { api } from "@/utils/api";

type UseUpsertTaskInput = {
  existingTaskId?: string;
  status: TaskStatus;
};

const useUpsertTask = ({ existingTaskId, status }: UseUpsertTaskInput) => {
  const session = useSession();
  const utils = api.useContext();
  const upsertTask = api.task.upsertTask.useMutation({
    async onMutate(upsertTaskInput) {
      await utils.task.getMyTasksByStatus.cancel({ status });
      await utils.task.getTotalUnscheduledTasksCount.cancel();

      const prevTaskListData = utils.task.getMyTasksByStatus.getData({
        status,
      });
      const prevUnscheduledCount =
        utils.task.getTotalUnscheduledTasksCount.getData();

      if (!existingTaskId) {
        utils.task.getMyTasksByStatus.setData({ status }, (old = []) => {
          // Is creating new task
          if (!session.data) {
            throw new Error("Session not found");
          }

          if (!upsertTaskInput.id) {
            throw new Error("Missing new task ID from input");
          }

          return [
            ...old,
            {
              id: upsertTaskInput.id,
              userId: session.data.user.id,
              unscheduledOrder: null,
              scheduledDate: null,
              scheduledOrder: null,
              completedAt: null,
              completed: false,
              notes: null,
              createdAt: new Date(),
              updatedAt: new Date(),
              ...upsertTaskInput,
            },
          ];
        });
        utils.task.getTotalUnscheduledTasksCount.setData(
          undefined,
          (old = 0) => old + 1,
        );
      } else {
        // Is updating existing task
        utils.task.getMyTasksByStatus.setData({ status }, (old = []) => {
          return old.map((task) =>
            task.id === existingTaskId
              ? {
                  ...task,
                  ...upsertTaskInput,
                }
              : { ...task },
          );
        });
      }

      return { prevTaskListData, prevUnscheduledCount };
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

  return upsertTask;
};

export { useUpsertTask };
