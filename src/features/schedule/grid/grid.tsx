"use client";

import { FiPlus } from "react-icons/fi";

import { api } from "~/trpc/react";

import { Task } from "~/features/task";

import { cn } from "~/utils";

import { data } from "./data";
import { GRID_COL_COUNT, getAllCells, getEmptyCellsFromData } from "./utils";

const ScheduleGrid = () => {
  // const [tasks] = api.task.getByWeek.useSuspenseQuery();

  const allCells = getAllCells();
  const emptyCells = getEmptyCellsFromData(data);

  return (
    <div
      className={cn(
        "relative col-start-2 col-end-[span_7] row-start-2 row-end-[span_32] grid grid-cols-subgrid grid-rows-subgrid",
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
                "absolute inset-0 z-0 block rounded-lg border-2 border-dashed border-opaque border-opacity-10 bg-navy-800/15 opacity-0 hover:opacity-100 hover:backdrop-blur-md focus:opacity-100 focus:backdrop-blur-md",
              )}
              style={{
                gridColumn: `${cell.x + 1} / span 1`,
                gridRow: `${cell.y + 1} / span 1`,
              }}
            >
              <FiPlus size={22} className="mx-auto text-border-opaque" />
            </button>
          );
        }

        // If the current cell is neither empty nor has a task it means it is
        // occupied by a previous task's width or height, so return null
        if (!task) {
          return null;
        }

        return (
          <Task
            key={task.id}
            task={task}
            style={{
              gridColumn: `${task.x + 1} / span ${task.w}`,
              gridRow: `${task.y + 1} / span ${task.h}`,
            }}
            className="absolute inset-0"
          />
        );
      })}
    </div>
  );
};

export { ScheduleGrid };
