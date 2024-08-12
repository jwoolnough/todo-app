import { GridStack } from "gridstack";
import "gridstack/dist/gridstack-extra.css";
import { useLayoutEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";

import { Task } from "~/features/task";

import { cn } from "~/utils";

import { data as initialData } from "./data";
import "./gridstack-custom.css";
import {
  GRID_COLS,
  GRID_ROWS,
  getAllCells,
  getEmptyCellsFromData,
} from "./utils";

const ScheduleGrid = () => {
  const [data] = useState(initialData);
  const gridRef = useRef<GridStack | null>(null);

  useLayoutEffect(() => {
    gridRef.current = GridStack.init({
      column: GRID_COLS,
      cellHeight: 37, // cell height + gap
      maxRow: GRID_ROWS,
      margin: 2.5, // gap width / 2
      float: true,
      resizable: {
        handles: "s",
      },
    });

    gridRef.current.on("change", (_event, items) => {
      console.log(items);
    });
  }, []);

  const allCells = getAllCells();
  const emptyCells = getEmptyCellsFromData(data);

  return (
    <div
      className={cn(
        "grid-stack col-start-2 col-end-[span_7] row-start-2 row-end-[span_32] m-[calc(var(--gap)*-0.5)] !grid grid-cols-subgrid grid-rows-subgrid",
      )}
    >
      {allCells.map((cell) => {
        const task = data.find(
          (task) => task.x === cell.x && task.y === cell.y,
        );

        // If current cell is empty, show a placeholder
        if (
          emptyCells.find(
            (emptyCell) => emptyCell.x === cell.x && emptyCell.y === cell.y,
          )
        ) {
          return (
            <button
              key={`${cell.x},${cell.y}`}
              className={cn(
                "absolute inset-0 z-0 block rounded-lg border-2 border-dashed border-opaque border-opacity-10 bg-navy-800/15 opacity-0 duration-300 hover:opacity-100 hover:backdrop-blur-md focus:opacity-100 focus:backdrop-blur-md",
                cell.x === 0 && "ml-[calc(var(--gap)*0.5)]",
                cell.x === GRID_COLS - 1 && "mr-[calc(var(--gap)*0.5)]",
              )}
              style={{
                gridColumn: `${cell.x + 1} / span 1`,
                gridRow: `${cell.y + 1} / span 1`,
              }}
            >
              <FiPlus size={22} className="text-border-opaque mx-auto" />
            </button>
          );
        }

        // If the current cell is neither empty nor has a task it means it is
        // occupied by a previous task's width or height, so return null
        if (!task) {
          return null;
        }

        return (
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
        );
      })}
    </div>
  );
};

export { ScheduleGrid };
