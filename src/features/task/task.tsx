"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";

import { cn } from "~/utils";

type TaskProps = {
  title: string;
  description?: string;
  note?: string;
  className?: string;
  defaultChecked?: boolean;
};

const Task = ({
  title,
  description,
  note, // TODO: Implement note popover
  className,
  defaultChecked = false,
}: TaskProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div
      className={cn(
        "rounded-lg bg-navy-800 px-3 py-1.5 transition",
        "[.react-draggable-dragging>&]:rotate-2 [.react-draggable-dragging>&]:bg-opacity-75 [.react-draggable-dragging>&]:shadow-lg [.react-draggable-dragging>&]:backdrop-blur-md  [.react-draggable-dragging>&]:backdrop-brightness-150",
        checked && "bg-green-900",
        className,
      )}
    >
      <div className="flex items-start gap-2">
        <h5 className={cn("line-clamp-2 text-base font-regular")}>{title}</h5>

        <label
          className={cn(
            "relative ml-auto mr-[-0.1875rem] mt-[0.1875rem] size-3.5 shrink-0 rounded-md border hover:border-navy-100 has-[:focus-visible]:ring-2",
            checked && "!border- bg-green-500 shadow-neon hover:bg-green-300",
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
            className="absolute inset-0 size-full cursor-pointer opacity-0"
            aria-label="Mark task as complete"
            onChange={() => setChecked(!checked)}
            checked={checked}
          />
        </label>
      </div>
      {description && (
        <p className={cn("mt-2 text-sm", checked && "text-green-300")}>
          {description}
        </p>
      )}
    </div>
  );
};

export { Task };
