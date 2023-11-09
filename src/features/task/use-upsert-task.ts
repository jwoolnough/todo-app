import type { TaskStatus } from "@prisma/client";
import { startOfWeek } from "date-fns";
import { useSession } from "next-auth/react";

import { api } from "@/utils/api";

type UseUpsertTaskInput = {
  existingTaskId?: string;
  status: TaskStatus;
};

const TASK_DEFAULTS = {
  unscheduledOrder: null,
  scheduledDate: null,
  scheduledOrder: null,
  completedAt: null,
  completed: false,
  notes: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const useUpsertTask = ({ existingTaskId, status }: UseUpsertTaskInput) => {
  const session = useSession();
  const utils = api.useContext();
  const upsertTask = api.task.upsertTask.useMutation({
    async onMutate(upsertTaskInput) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.task.getMyTasksByStatus.cancel({ status });
      await utils.task.getTotalUnscheduledTasksCount.cancel();

      const startOfWeekDate = upsertTaskInput.scheduledDate
        ? startOfWeek(upsertTaskInput.scheduledDate, { weekStartsOn: 1 })
        : null;

      if (startOfWeekDate) {
        await utils.task.getTasksByWeek.cancel({ startOfWeekDate });
      }

      // Grab all previous data of affected queries and store in context
      // to fallback to
      const prevTasksByStatusData = utils.task.getMyTasksByStatus.getData({
        status,
      });
      const prevUnscheduledTasksCount =
        utils.task.getTotalUnscheduledTasksCount.getData();
      const prevTasksByWeekData = utils.task.getTasksByWeek.getData();

      if (!existingTaskId) {
        if (!session.data) {
          throw new Error("Session not found");
        }

        utils.task.getMyTasksByStatus.setData({ status }, (old = []) => {
          // Is creating new task
          if (!upsertTaskInput.id) {
            throw new Error("Missing new task ID from input");
          }

          return [
            ...old,
            {
              id: upsertTaskInput.id,
              userId: session.data.user.id,
              ...TASK_DEFAULTS,
              ...upsertTaskInput,
            },
          ];
        });

        // TODO: Need to handle the case when tasks are moved into scheduled, i.e. decrement
        if (status !== "SCHEDULED") {
          utils.task.getTotalUnscheduledTasksCount.setData(
            undefined,
            (old = 0) => old + 1,
          );
        } else if (startOfWeekDate) {
          utils.task.getTasksByWeek.setData({ startOfWeekDate }, (old = []) => {
            if (!upsertTaskInput.id) {
              throw new Error("Missing new task ID from input");
            }

            return [
              ...old,
              {
                id: upsertTaskInput.id,
                userId: session.data.user.id,
                ...TASK_DEFAULTS,
                ...upsertTaskInput,
              },
            ];
          });
        }
      } else {
        // Is updating existing task
        if (status !== "SCHEDULED") {
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
        } else if (startOfWeekDate) {
          utils.task.getTasksByWeek.setData({ startOfWeekDate }, (old = []) => {
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
      }

      return {
        prevTasksByStatusData,
        prevUnscheduledTasksCount,
        prevTasksByWeekData,
      };
    },
    onError(_err, newTask, ctx) {
      utils.task.getMyTasksByStatus.setData(
        { status },
        ctx?.prevTasksByStatusData,
      );

      utils.task.getTotalUnscheduledTasksCount.setData(
        undefined,
        ctx?.prevUnscheduledTasksCount,
      );

      if (newTask.scheduledDate) {
        utils.task.getTasksByWeek.setData(
          {
            startOfWeekDate: startOfWeek(newTask.scheduledDate, {
              weekStartsOn: 1,
            }),
          },
          ctx?.prevTasksByWeekData,
        );
      }
    },
    onSettled() {
      void utils.task.getMyTasksByStatus.invalidate({ status });
      void utils.task.getTotalUnscheduledTasksCount.invalidate();
      void utils.task.getTasksByWeek.invalidate();
    },
  });

  return upsertTask;
};

export { useUpsertTask };
