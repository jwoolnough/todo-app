"use client";

import { FiPlus } from "react-icons/fi";

import { cn } from "~/utils";
import { startOfWeek } from "~/utils/date";

import { api } from "~/trpc/react";

import { Task } from "~/features/task";

import { useDateQuery } from "../hooks/use-date-query";
import { getAllCells, getEmptyCellsFromData, getTaskDimensions } from "./utils";

type ScheduleGridProps = {
  onPlaceholderClick: (time: Date) => void;
};

const ScheduleGrid = ({ onPlaceholderClick }: ScheduleGridProps) => {
  const { selectedWeekDate } = useDateQuery();
  const { data: tasks } = api.task.getByWeek.useQuery(selectedWeekDate);

  if (!tasks) {
    return null;
  }

  const allCells = getAllCells(startOfWeek(selectedWeekDate));
  const emptyCells = getEmptyCellsFromData(tasks);

  return (
    <div
      className={cn(
        "relative col-start-2 col-end-[span_7] row-start-2 row-end-[span_32] grid grid-cols-subgrid grid-rows-subgrid",
      )}
    >
      {allCells.map((cell) => {
        const task = tasks.find(
          (task) => task.scheduledStartDate?.getTime() === cell.date.getTime(),
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
              onClick={() => onPlaceholderClick(cell.date)}
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

        const { x, y, w, h } = getTaskDimensions(task);

        return (
          <Task
            key={task.id}
            task={task}
            style={{
              gridColumn: `${x + 1} / span ${w}`,
              gridRow: `${y + 1} / span ${h}`,
            }}
            className="absolute inset-0"
          />
        );
      })}
    </div>
  );
};

export { ScheduleGrid };
