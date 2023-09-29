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
      if (existingTaskId) return;

      await utils.task.getMyTasksByStatus.cancel({ status });
      const prevData = utils.task.getMyTasksByStatus.getData({ status });

      utils.task.getMyTasksByStatus.setData({ status }, (old = []) => {
        // This is the path for creating - need to handle updating
        if (!session.data) {
          throw new Error("Session not found");
        }

        if (!upsertTaskInput.id) {
          throw new Error("Missing ID from input");
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

      return { prevData };
    },
    onError(_err, _newPost, ctx) {
      utils.task.getMyTasksByStatus.setData({ status }, ctx?.prevData);
    },
    onSettled() {
      return utils.task.getMyTasksByStatus.invalidate({ status });
    },
  });

  return upsertTask;
};

export { useUpsertTask };
