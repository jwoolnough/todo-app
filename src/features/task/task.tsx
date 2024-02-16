import type { Task as TaskType } from "@prisma/client";
import { type RefObject, useId, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

import { Check } from "@/components/check";

import { clsxm } from "@/utils/clsxm";
import { startOfWeek } from "@/utils/date";

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
  onCompletionChange?: (completed: boolean) => Promise<void>;
  completed?: boolean;
  renderRight?: () => React.ReactNode;
};

const BaseTask = ({
  label = "Task",
  className,
  title: initialTitle = "",
  isPlaceholder = false,
  onSubmit,
  onCompletionChange,
  completed = false,
  renderRight,
}: BaseTaskProps) => {
  const inputId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState(initialTitle);

  return (
    <form
      className={clsxm(
        "group relative grid grid-cols-[min-content,minmax(0,1fr)] gap-2 transition",
        renderRight && "grid-cols-[min-content,minmax(0,1fr),min-content]",
        className,
      )}
    >
      <Check
        className="relative z-10 mt-0.5"
        onChange={() => void onCompletionChange?.(!completed)}
        checked={completed}
        disabled={isPlaceholder}
      />

      {/* Absolutely cover the textareas label so you can click anywhere in the task
      to edit, excepting the context menu or checkbox which are layered on top */}
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
        onBlur={(e) => {
          // If the user 'cancels' the input by blurring without pressing enter
          // (and focusing the next textarea), reset the input
          if (!e.relatedTarget || e.relatedTarget?.tagName !== "TEXTAREA") {
            setTitle(initialTitle);
          }
        }}
        className="relative resize-none bg-transparent text-sm text-white outline-none placeholder:text-slate-700"
      />

      {renderRight?.()}
    </form>
  );
};

type TaskProps = Omit<BaseTaskProps, "onSubmit"> & {
  task: TaskType;
};

const Task = ({ task, ...rest }: TaskProps) => {
  const { id, title, status, scheduledDate, completed } = task;
  const upsertTask = useUpsertTask({ existingTaskId: id, status });
  const deleteTask = useDeleteTask({
    status,
    startOfWeekDate: scheduledDate ? startOfWeek(scheduledDate) : undefined,
  });

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

  const handleCompletionChange = async (completed: boolean) => {
    try {
      await upsertTask.mutateAsync({
        id,
        title,
        status,
        completed,
        completedAt: completed ? new Date() : null,
      });
    } catch (e) {
      toast.error(
        "Couldn't change status of task, please try again or contact support",
      );
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
      onCompletionChange={handleCompletionChange}
      completed={completed}
      {...rest}
    />
  );
};

export { BaseTask, Task };
export type { BaseTaskProps, TaskSubmitFunction };
