"use client";

import { type Task } from "@prisma/client";
import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";

import { cn } from "~/utils";

import { TaskContextMenu } from "./context-menu";

type TaskSubmitValues = Partial<
  Omit<Task, "id" | "completedAt" | "createdById" | "createdAt" | "updatedAt">
>;

type TaskSubmitFunction = (
  values: TaskSubmitValues,
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
) => Promise<void>;

type BaseTaskProps = Partial<Pick<Task, "description" | "note">> & {
  title?: string;
  className?: string;
  completed?: boolean;
  onCompletionChange?: (completed: boolean) => Promise<void>;
  isPlaceholder?: boolean;
  hideDescription?: boolean;
  onSubmit: TaskSubmitFunction;
};

const BaseTask = ({
  title: defaultTitle = "",
  description: defaultDescription = "",
  className,
  completed = false,
  onCompletionChange,
  isPlaceholder = false,
  hideDescription = false,
  onSubmit,
}: BaseTaskProps) => {
  const titleInputRef = useRef<HTMLTextAreaElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);

  const handleToggleCompletion = () => onCompletionChange?.(!completed);

  return (
    <TaskContextMenu>
      <div
        className={cn(
          "grid-stack-item-content",
          "group rounded-lg bg-navy-800 px-3 py-1.5 transition",
          "[.ui-draggable-dragging_&]:rotate-2 [.ui-draggable-dragging_&]:bg-opacity-75 [.ui-draggable-dragging_&]:shadow-lg [.ui-draggable-dragging_&]:backdrop-blur-md [.ui-draggable-dragging_&]:backdrop-brightness-150",
          "[.ui-resizable-resizing_&]:shadow-lg",
          className,
          completed && "bg-green-900",
          isPlaceholder && "bg-navy-800/60",
        )}
        onDoubleClick={!isPlaceholder ? handleToggleCompletion : undefined}
      >
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
              "relative ml-auto mr-[-0.1875rem] mt-[0.1875rem] size-3.5 shrink-0 rounded-md border has-[:focus-visible]:ring-2",
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
        {/* TODO: Description shouldn't be rendered if task 'height' is less than 2 */}
        {!hideDescription && (
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
    </TaskContextMenu>
  );
};

type TaskProps = Omit<BaseTaskProps, "onSubmit"> & {
  task: Task;
};

const Task = ({ task, ...rest }: TaskProps) => {
  const handleSubmit: TaskSubmitFunction = async (values) => {
    console.log(values);
    // upsert
  };

  return <BaseTask onSubmit={handleSubmit} {...task} {...rest} />;
};

export { BaseTask, Task };
export type { TaskSubmitFunction };
