import type { Task } from "@prisma/client";

import { DAY_TIMES, HOUR_SUBDIVISIONS, WEEKDAYS } from "~/constants";

import { addDays, differenceInMinutes, format, set } from "~/utils/date";

import type { RouterOutputs } from "~/trpc/react";

type Cell = {
  x: number;
  y: number;
  date: Date;
};

const GRID_COL_COUNT = WEEKDAYS.length;
const GRID_ROW_COUNT = DAY_TIMES.length;

const getAllCells = (weekDate: Date) => {
  const cells: Cell[] = [];

  // Iterate through all cells in the grid
  for (let x = 0; x < GRID_COL_COUNT; x++) {
    const day = addDays(weekDate, x);

    for (let y = 0; y < GRID_ROW_COUNT; y++) {
      const time = DAY_TIMES[y];

      if (!time) {
        throw new Error("Invalid time");
      }

      const [hours, minutes] = time.split(":").map(Number);

      cells.push({ x, y, date: set(day, { hours, minutes }) });
    }
  }

  return cells;
};

const getTaskDimensions = ({
  scheduledStartDate: start,
  scheduledEndDate: end,
}: Pick<Task, "scheduledEndDate" | "scheduledStartDate">) => {
  if (!start || !end) {
    throw new Error("Task appears to be unscheduled - shouldn't be possiblew");
  }

  const x = WEEKDAYS.findIndex((day) => day === format(start, "EEEE"));
  const y = DAY_TIMES.findIndex((time) => time === format(start, "HH:mm"));

  const w = 1;
  const h = (differenceInMinutes(end, start) / 60) * HOUR_SUBDIVISIONS;

  return { w, h, x, y };
};

const getEmptyCellsFromData = (data: RouterOutputs["task"]["getByWeek"]) => {
  const cells = new Set<string>();

  // Iterate through all cells in the grid
  for (let x = 0; x < GRID_COL_COUNT; x++) {
    for (let y = 0; y < GRID_ROW_COUNT; y++) {
      cells.add(`${x},${y}`);
    }
  }

  const nonEmptyCells = new Set<string>();

  // Iterate through data and add non-empty cells to a set
  data.forEach((task) => {
    const dimensions = getTaskDimensions(task);
    if (task.title === "Big breakfast") {
      console.clear();
      console.dir(dimensions);
    }

    for (let w = 0; w < dimensions.w; w++) {
      for (let h = 0; h < dimensions.h; h++) {
        nonEmptyCells.add(`${dimensions.x + w},${dimensions.y + h}`);
      }
    }
  });

  // Remove non-empty cells from all cells
  nonEmptyCells.forEach((cell) => {
    cells.delete(cell);
  });

  return [...cells.values()].map((cell) => {
    const [x, y] = cell.split(",").map(Number);
    return { x, y } as Cell;
  });
};

export {
  getAllCells,
  getEmptyCellsFromData,
  getTaskDimensions,
  GRID_COL_COUNT,
  GRID_ROW_COUNT,
};
