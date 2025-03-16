"use client";

import { type Task } from "@prisma/client";
import { forwardRef, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";

import { cn } from "~/utils";

import { getTaskDimensions } from "../schedule/grid/utils";
import { TaskContext } from "./context";
import { TaskContextMenu } from "./context-menu";

type TaskSubmitValues = Partial<
  Omit<Task, "id" | "completedAt" | "createdById" | "createdAt" | "updatedAt">
>;

type TaskSubmitFunction = (
  values: TaskSubmitValues,
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
) => Promise<void>;

type BaseTaskProps = Omit<React.ComponentPropsWithoutRef<"div">, "onSubmit"> & {
  task?: Task;
  onCompletionChange?: (completed: boolean) => Promise<void>;
  isPlaceholder?: boolean;
  hideDescription?: boolean;
  onSubmit: TaskSubmitFunction;
  isDraggable?: boolean;
};

const BaseTask = forwardRef<HTMLDivElement, BaseTaskProps>(
  (
    {
      task,
      className,
      onCompletionChange,
      isPlaceholder = false,
      hideDescription = false,
      onSubmit,
      isDraggable = true,
      ...rest
    },
    ref,
  ) => {
    const {
      title: defaultTitle = "",
      description: defaultDescription = "",
      completed = false,
      scheduledStartDate,
      scheduledEndDate,
    } = task ?? {};

    const titleInputRef = useRef<HTMLTextAreaElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

    const [title, setTitle] = useState(defaultTitle);
    const [description, setDescription] = useState(defaultDescription);

    const handleToggleCompletion = () => onCompletionChange?.(!completed);

    const dimensions =
      scheduledStartDate && scheduledEndDate
        ? getTaskDimensions({ scheduledStartDate, scheduledEndDate })
        : null;

    const showDescription = !hideDescription && dimensions && dimensions?.h > 1;

    return (
      <div
        ref={ref}
        className={cn(
          "group relative rounded-lg bg-navy-800 py-1.5 pl-5 pr-3 transition",
          "[.ui-draggable-dragging_&]:rotate-2 [.ui-draggable-dragging_&]:cursor-grabbing [.ui-draggable-dragging_&]:bg-opacity-75 [.ui-draggable-dragging_&]:shadow-lg [.ui-draggable-dragging_&]:backdrop-blur-md [.ui-draggable-dragging_&]:backdrop-brightness-150",
          "[.ui-resizable-resizing_&]:shadow-lg",
          className,
          completed && "bg-green-900",
          isPlaceholder && "bg-navy-800/60",
        )}
        onDoubleClick={!isPlaceholder ? handleToggleCompletion : undefined}
        {...rest}
      >
        {isDraggable && (
          <MdDragIndicator
            size={14}
            className={cn(
              "absolute left-2.5 top-4 -translate-x-1/2 -translate-y-1/2 cursor-grab transition active:cursor-grabbing",
              completed
                ? "text-green-600 hover:text-green-300"
                : "text-navy-500 hover:text-navy-300",
            )}
          />
        )}
        <div className="flex items-start gap-2">
          <TextareaAutosize
            ref={titleInputRef}
            spellCheck={false}
            className={cn(
              "resize-none bg-transparent text-white outline-none placeholder:text-navy-300/50 hover:placeholder:text-navy-300/75",
            )}
            rows={1}
            placeholder="Add task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                e.preventDefault();
                void onSubmit({ title, description }, titleInputRef, setTitle);
              }

              if (e.code === "Escape") {
                titleInputRef.current?.blur();
              }
            }}
          />

          <label
            className={cn(
              "relative ml-auto mr-[-0.25rem] mt-[0.125rem] size-4 shrink-0 rounded-md border has-[:focus-visible]:ring-2",
              completed && "bg-green-500 shadow-neon hover:bg-green-300",
              !isPlaceholder && "hover:border-navy-100",
            )}
          >
            <FaCheck
              className={cn(
                "absolute left-1/2 top-1/2 size-[90%] -translate-x-1/2 -translate-y-1/2 text-black opacity-0 transition",
                completed && "opacity-100",
              )}
            />
            <input
              type="checkbox"
              className={cn(
                "absolute inset-0 size-full opacity-0",
                !isPlaceholder && "cursor-pointer",
              )}
              aria-label={`Mark task as ${!completed ? "complete" : "incomplete"}`}
              onChange={handleToggleCompletion}
              checked={completed}
              disabled={isPlaceholder}
            />
          </label>
        </div>
        {showDescription && (
          <TextareaAutosize
            ref={descriptionInputRef}
            spellCheck={false}
            rows={1}
            className={cn(
              "mt-2 w-full resize-none bg-transparent text-sm outline-none transition-colors placeholder:opacity-0 placeholder:transition group-focus-within:placeholder:opacity-100 group-hover:placeholder:opacity-100",
              completed && "text-green-300",
            )}
            value={description ?? ""}
            placeholder="Add description"
            onChange={(e) => setDescription(e.target.value)}
          />
        )}
      </div>
    );
  },
);
BaseTask.displayName = "BaseTask";

type TaskProps = Omit<BaseTaskProps, "onSubmit"> & {
  task: Task;
};

const Task = ({ task, ...rest }: TaskProps) => {
  const handleSubmit: TaskSubmitFunction = async (values) => {
    // upsert
  };

  return (
    <TaskContext.Provider value={task}>
      <TaskContextMenu>
        <BaseTask onSubmit={handleSubmit} task={task} {...rest} />
      </TaskContextMenu>
    </TaskContext.Provider>
  );
};

export { BaseTask, Task };
export type { TaskSubmitFunction };
