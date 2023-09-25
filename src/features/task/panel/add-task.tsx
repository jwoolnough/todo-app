import { useSession } from "next-auth/react";
import { type FormEventHandler, useId, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";

import { Check } from "@/components/check";

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
  const inputRef = useRef<HTMLInputElement>(null);

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
      inputRef.current?.focus();
    } catch (e) {
      toast.error("Unable to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex gap-2">
      <div className="relative mt-0.5 shrink-0 self-start text-center font-bold leading-none text-slate-700 after:absolute after:inset-0 after:content-['+']">
        <Check className="" disabled />
      </div>

      <label htmlFor={`add-task-${id}`} className="sr-only before:inset-0">
        Add task
      </label>
      <input
        id={`add-task-${id}`}
        placeholder="Add task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className={clsxm(
          "bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-700 focus:text-white",
        )}
        ref={inputRef}
      />

      <input type="submit" disabled={task === ""} className="sr-only" />
    </form>
  );
};

export { AddTask };
