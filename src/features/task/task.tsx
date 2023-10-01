import { createId } from "@paralleldrive/cuid2";
import type { TaskStatus, Task as TaskType } from "@prisma/client";
import { type RefObject, useId, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

import { Check } from "@/components/check";

import { clsxm } from "@/utils/clsxm";

import { ActionsMenu } from "./actions-menu";
import { useDeleteTask } from "./use-delete-task";
import { useUpsertTask } from "./use-upsert-task";

type TaskSubmitValues = { completed?: boolean; title?: string };

type TaskSubmitFunction = (
  values: TaskSubmitValues,
  textareaRef: RefObject<HTMLTextAreaElement>,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
) => Promise<void>;

type BaseTaskProps = {
  label?: string;
  isPlaceholder?: boolean;
  className?: string;
  title?: string;
  onSubmit: TaskSubmitFunction;
  renderRight?: () => React.ReactNode;
};

const BaseTask = ({
  label = "Task",
  className,
  title: initialTitle = "",
  isPlaceholder = false,
  onSubmit,
  renderRight,
}: BaseTaskProps) => {
  const inputId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState(initialTitle);

  return (
    <form
      className={clsxm(
        "group relative grid grid-cols-[min-content,minmax(0,1fr)] gap-2",
        renderRight && "grid-cols-[min-content,minmax(0,1fr),min-content]",
        className,
      )}
    >
      <Check
        className="relative z-10 mt-0.5"
        // onChange={onCompletionChange}
        // value={completed}
        disabled={isPlaceholder}
      />

      {/* Absolutely cover the textareas label so you can click anywhere in the task to edit, excepting the context menu or checkbox which are layered on top */}
      <label
        htmlFor={`task-title-${inputId}`}
        className="absolute inset-0 cursor-text"
      >
        <span className="sr-only">{label}</span>
      </label>

      <TextareaAutosize
        ref={inputRef}
        id={`task-title-${inputId}`}
        placeholder={label}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            e.preventDefault();
            void onSubmit({ title }, inputRef, setTitle);
          }

          if (e.code === "Escape") {
            inputRef.current?.blur();
          }
        }}
        onBlur={() => {
          setTitle(initialTitle);
        }}
        className="z-10 resize-none bg-transparent text-sm text-white outline-none placeholder:text-slate-700"
      />

      {renderRight?.()}
    </form>
  );
};

type TaskProps = Omit<BaseTaskProps, "onSubmit"> & {
  task: TaskType;
};

const Task = ({ task, ...rest }: TaskProps) => {
  const { id, title, status } = task;
  const upsertTask = useUpsertTask({ existingTaskId: id, status });
  const deleteTask = useDeleteTask({ status });

  const handleUpsertTask: TaskSubmitFunction = async (values, textareaRef) => {
    if (!values.title) return;

    try {
      // Focus the next textarea in the list
      const grandparent = textareaRef.current?.parentNode?.parentNode;
      const nextTask = grandparent?.nextSibling;
      nextTask && (nextTask as HTMLElement).querySelector("textarea")?.focus();

      await upsertTask.mutateAsync({
        id,
        status,
        title: values.title ?? title,
        ...values,
      });
    } catch (e) {
      toast.error("Unable to update task, please try again or contact support");
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask.mutateAsync(id);
    } catch (e) {
      toast.error("Unable to delete task, please try again or contact support");
    }
  };

  return (
    <BaseTask
      title={title}
      onSubmit={handleUpsertTask}
      renderRight={() => (
        <ActionsMenu
          onAddNote={() => console.log("add note")}
          onDelete={() => void handleDeleteTask()}
        />
      )}
      {...rest}
    />
  );
};

type AddTaskProps = Omit<BaseTaskProps, "onSubmit"> & {
  status: TaskStatus;
};

const AddTask = ({ status, ...rest }: AddTaskProps) => {
  const upsertTask = useUpsertTask({ status });

  const handleCreateTask: TaskSubmitFunction = async (
    { title },
    textareaRef,
    setTitle,
  ) => {
    if (!title) return;

    const prevValue = title;
    setTitle("");

    try {
      await upsertTask.mutateAsync({
        id: createId(),
        title,
        status,
      });
      textareaRef.current?.focus();
    } catch (e) {
      setTitle(prevValue);
      toast.error("Unable to create task, please try again or contact support");
    }
  };

  return (
    <BaseTask
      label="Add task"
      onSubmit={handleCreateTask}
      isPlaceholder
      {...rest}
    />
  );
};

export { Task, AddTask };
