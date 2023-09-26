import { createId } from "@paralleldrive/cuid2";
import { type TaskStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useId, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

import { Check } from "@/components/check";

import { api } from "@/utils/api";
import { clsxm } from "@/utils/clsxm";

type AddTaskProps = {
  status: TaskStatus;
};

const AddTask = ({ status }: AddTaskProps) => {
  const [task, setTask] = useState("");
  const utils = api.useContext();
  const session = useSession();
  const id = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const createTask = api.task.createTask.useMutation({
    async onMutate(newTodo) {
      await utils.task.getMyTasksByStatus.cancel({ status });
      const prevData = utils.task.getMyTasksByStatus.getData({ status });

      utils.task.getMyTasksByStatus.setData({ status }, (old = []) => {
        if (!session.data) {
          throw new Error("Session not found");
        }

        return [
          ...old,
          {
            id: createId(),
            userId: session.data.user.id,
            unscheduledOrder: null,
            scheduledDate: null,
            scheduledOrder: null,
            completedAt: null,
            notes: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            ...newTodo,
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

  const handleSubmit = async () => {
    const prevValue = task;
    setTask("");

    try {
      await createTask.mutateAsync({
        title: task,
        status,
      });
      inputRef.current?.focus();
    } catch (e) {
      setTask(prevValue);
      toast.error("Unable to create task, please try again or contact support");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit();
      }}
    >
      <label
        htmlFor={`add-task-${id}`}
        className="-mx-2 flex cursor-text gap-2 rounded-sm px-2 py-1 transition focus-within:bg-slate-800 hover:bg-slate-800"
      >
        <span className="sr-only">Add task</span>

        <div className="relative mt-0.5 shrink-0 self-start text-center font-bold leading-none text-slate-700 after:absolute after:inset-0 after:content-['+']">
          <Check className="" disabled />
        </div>

        <TextareaAutosize
          id={`add-task-${id}`}
          placeholder="Add task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              e.preventDefault();
              void handleSubmit();
            }
          }}
          className={clsxm(
            "resize-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-700  focus:text-white",
          )}
          ref={inputRef}
        />
      </label>

      <input type="submit" disabled={task === ""} className="sr-only" />
    </form>
  );
};

export { AddTask };
