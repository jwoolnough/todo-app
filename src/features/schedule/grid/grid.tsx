import { GridStack } from "gridstack";
import "gridstack/dist/gridstack-extra.css";
import { useLayoutEffect } from "react";

import { Task } from "~/features/task";

import { cn } from "~/utils";

import { data } from "./data";
import "./gridstack-custom.css";

const ScheduleGrid = () => {
  useLayoutEffect(() => {
    GridStack.init({
      column: 7,
      cellHeight: 37, // cell height + gap
      maxRow: 32,
      margin: 2.5, // gap width / 2
      float: true,
      resizable: {
        handles: "s",
      },
    });
  }, []);

  return (
    <div
      className={cn(
        "grid-stack !absolute inset-[calc(var(--gap)*-0.5)] col-start-2 col-end-[span_7] row-start-2 row-end-[span_32]",
      )}
    >
      {data.map((task) => (
        <div
          key={task.i}
          className="grid-stack-item"
          gs-x={task.x}
          gs-y={task.y}
          gs-w={task.w}
          gs-h={task.h}
        >
          <Task
            title={task.title}
            description={task.description}
            defaultChecked={task.completed}
            className="grid-stack-item-content"
          />
        </div>
      ))}
      <div className="grid-stack-placeholder"></div>
    </div>
  );
};

export { ScheduleGrid };
