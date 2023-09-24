import { useSession } from "next-auth/react";
import { type FormEventHandler, useId, useState } from "react";
import { toast } from "react-toastify";

import { api } from "@/utils/api";
import { clsxm } from "@/utils/clsxm";

import type { TaskStatus } from "@/constants/task";

type AddTaskProps = {
  status: TaskStatus;
};

const AddTask = ({ status }: AddTaskProps) => {
  const [task, setTask] = useState("");
  const utils = api.useContext();
  const session = useSession();
  const id = useId();

  const createTask = api.task.createTask.useMutation({
    async onMutate(newTodo) {
      await utils.task.getMyTasksByStatus.cancel({ status });
      const prevData = utils.task.getMyTasksByStatus.getData({ status });
      console.log(prevData);

      // TODO: FIX!
      utils.task.getMyTasksByStatus.setData({ status }, (old = []) => {
        console.log(old);

        return [
          ...old,
          { id: "test", userId: session.data?.user.id, ...newTodo },
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

  // TODO: Investigate this - possible false positive?
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await createTask.mutateAsync({
        title: task,
        status,
      });

      setTask("");
    } catch (e) {
      toast.error("Unable to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={`add-task-${id}`} className="sr-only">
        Add task
      </label>
      <input
        id={`add-task-${id}`}
        placeholder="Add task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className={clsxm("bg-transparent outline-none")}
      />

      <input type="submit" disabled={task === ""} className="sr-only" />
    </form>
  );
};

export { AddTask };
