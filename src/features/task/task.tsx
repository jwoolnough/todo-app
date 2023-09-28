import type { Task as TaskType } from "@prisma/client";
import { useId, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { Check } from "@/components/check";

import { clsxm } from "@/utils/clsxm";

import { ActionsMenu } from "./actions-menu";

type BaseTaskProps = {
  label?: string;
  isPlaceholder?: boolean;
  className?: string;
  title?: string;
};

const BaseTask = ({
  label = "Task",
  className,
  title: initialTitle = "",
  isPlaceholder = false,
}: BaseTaskProps) => {
  const inputId = useId();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState(initialTitle);

  return (
    <form
      className={clsxm(
        "group relative grid grid-cols-[min-content,minmax(0,1fr),min-content] gap-2",
        className,
      )}
    >
      <Check className="relative z-10 mt-0.5" disabled={isPlaceholder} />

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
        className="z-10 resize-none bg-transparent text-sm text-white outline-none placeholder:text-slate-700"
      />

      <ActionsMenu />
    </form>
  );
};

type TaskProps = BaseTaskProps & {
  task: TaskType;
};

const Task = ({ task, ...rest }: TaskProps) => {
  const { title } = task;

  return <BaseTask title={title} {...rest} />;
};

export { Task };
