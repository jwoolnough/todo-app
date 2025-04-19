import { type RouterOutputs, api } from "~/trpc/react";

import { Task, type TaskSubmitFunction } from "~/features/task";

import { getTaskDimensions } from "./utils";

type ScheduleTaskProps = {
  task: RouterOutputs["task"]["getByWeek"][number];
  selectedWeekDate: Date;
};

const ScheduleTask = ({ task, selectedWeekDate }: ScheduleTaskProps) => {
  const utils = api.useUtils();
  const updateTask = api.task.update.useMutation({
    onSuccess: async () => {
      await utils.task.getByWeek.invalidate(selectedWeekDate);
    },
  });

  const { x, y, w, h } = getTaskDimensions(task);

  const handleSubmit: TaskSubmitFunction = async (values) => {
    await updateTask.mutateAsync({ id: task.id, ...values });
  };

  const handleCompletionChange = async (completed: boolean) => {
    await updateTask.mutateAsync({
      id: task.id,
      completed,
      completedAt: completed ? new Date() : null,
    });
  };

  return (
    <Task
      key={task.id}
      task={task}
      style={{
        gridColumn: `${x + 1} / span ${w}`,
        gridRow: `${y + 1} / span ${h}`,
      }}
      className="absolute inset-0"
      onSubmit={handleSubmit}
      onCompletionChange={handleCompletionChange}
    />
  );
};

export { ScheduleTask };
