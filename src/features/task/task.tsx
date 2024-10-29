"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";

import { cn } from "~/utils";

import { TaskContextMenu } from "./context-menu";

type TaskProps = {
  title?: string;
  description?: string;
  note?: string;
  className?: string;
  defaultChecked?: boolean;
  isPlaceholder?: boolean;
  hideDescription?: boolean;
};

const Task = ({
  title: defaultTitle = "",
  description: defaultDescription = "",
  // note, // TODO: Implement note popover
  className,
  defaultChecked = false,
  isPlaceholder = false,
  hideDescription = false,
}: TaskProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);

  const toggle = () => setChecked(!checked);

  return (
    <TaskContextMenu>
      <div
        className={cn(
          "grid-stack-item-content",
          "group rounded-lg bg-navy-800 px-3 py-1.5 transition",
          "[.ui-draggable-dragging_&]:rotate-2 [.ui-draggable-dragging_&]:bg-opacity-75 [.ui-draggable-dragging_&]:shadow-lg [.ui-draggable-dragging_&]:backdrop-blur-md [.ui-draggable-dragging_&]:backdrop-brightness-150",
          "[.ui-resizable-resizing_&]:shadow-lg",
          className,
          checked && "bg-green-900",
          isPlaceholder && "bg-navy-800/50",
        )}
        onDoubleClick={!isPlaceholder ? toggle : undefined}
      >
        <div className="flex items-start gap-2">
          <TextareaAutosize
            spellCheck={false}
            className={cn(
              "resize-none bg-transparent text-white outline-none placeholder:text-navy-300/50 hover:placeholder:text-navy-300/75",
            )}
            placeholder="Add task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label
            className={cn(
              "relative ml-auto mr-[-0.1875rem] mt-[0.1875rem] size-3.5 shrink-0 rounded-md border has-[:focus-visible]:ring-2",
              checked && "bg-green-500 shadow-neon hover:bg-green-300",
              !isPlaceholder && "hover:border-navy-100",
            )}
          >
            <FaCheck
              className={cn(
                "absolute left-1/2 top-1/2 size-[90%] -translate-x-1/2 -translate-y-1/2 text-black opacity-0 transition",
                checked && "opacity-100",
              )}
            />
            <input
              type="checkbox"
              className={cn(
                "absolute inset-0 size-full opacity-0",
                !isPlaceholder && "cursor-pointer",
              )}
              aria-label="Mark task as complete"
              onChange={toggle}
              checked={checked}
              disabled={isPlaceholder}
            />
          </label>
        </div>
        {/* TODO: Description shouldn't be rendered if task 'height' is less than 2 */}
        {!hideDescription && (
          <TextareaAutosize
            spellCheck={false}
            className={cn(
              "mt-2 w-full resize-none bg-transparent text-sm outline-none transition-colors placeholder:opacity-0 placeholder:transition group-focus-within:placeholder:opacity-100 group-hover:placeholder:opacity-100",
              checked && "text-green-300",
            )}
            value={description}
            placeholder="Add description"
            onChange={(e) => setDescription(e.target.value)}
          />
        )}
      </div>
    </TaskContextMenu>
  );
};

export { Task };
