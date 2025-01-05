"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";

// import { GridStack, GridStackItem } from "~/components/gridstack";
import { Task } from "~/features/task";

import { cn } from "~/utils";

import { data as initialData } from "./data";
import {
  GRID_COL_COUNT,
  GRID_ROW_COUNT,
  getAllCells,
  getEmptyCellsFromData,
} from "./utils";

const ScheduleGrid = () => {
  // Data comes in from fetch above, and cells are setup as state for control with grid
  const [data, setData] = useState(initialData);

  const allCells = getAllCells();
  const emptyCells = getEmptyCellsFromData(data);

  // return (
  //   <GridStack
  //     options={{
  //       column: GRID_COL_COUNT,
  //       cellHeight: 37, // cell height + gap
  //       maxRow: GRID_ROW_COUNT,
  //       margin: 2.5, // gap width / 2
  //       float: true,
  //       acceptWidgets: true,
  //       resizable: {
  //         handles: "s",
  //       },
  //     }}
  //     cells={data}
  //     setCells={setData}
  //     // onChange={(_event, nodes) => {
  //     //   console.log(nodes);
  //     //   // setData(nodes);
  //     // }}
  //     className={cn(
  //       "grid-stack col-start-2 col-end-[span_7] row-start-2 row-end-[span_32] m-[calc(var(--gap)*-0.5)] !grid grid-cols-subgrid grid-rows-subgrid",
  //     )}
  //   >
  //     {allCells.map((cell) => {
  //       const task = data.find(
  //         (task) => task.x === cell.x && task.y === cell.y,
  //       );

  //       // If current cell is empty, show a placeholder
  //       if (
  //         emptyCells.find(
  //           (emptyCell) => emptyCell.x === cell.x && emptyCell.y === cell.y,
  //         )
  //       ) {
  //         return null;
  //         // return (
  //         //   <button
  //         //     key={`${cell.x},${cell.y}`}
  //         //     className={cn(
  //         //       "absolute inset-0 z-0 block rounded-lg border-2 border-dashed border-opaque border-opacity-10 bg-navy-800/15 opacity-0 duration-300 hover:opacity-100 hover:backdrop-blur-md focus:opacity-100 focus:backdrop-blur-md",
  //         //       cell.x === 0 && "ml-[calc(var(--gap)*0.5)]",
  //         //       cell.x === GRID_COL_COUNT - 1 && "mr-[calc(var(--gap)*0.5)]",
  //         //     )}
  //         //     style={{
  //         //       gridColumn: `${cell.x + 1} / span 1`,
  //         //       gridRow: `${cell.y + 1} / span 1`,
  //         //     }}
  //         //   >
  //         //     <FiPlus size={22} className="mx-auto text-border-opaque" />
  //         //   </button>
  //         // );
  //       }

  //       // If the current cell is neither empty nor has a task it means it is
  //       // occupied by a previous task's width or height, so return null
  //       if (!task) {
  //         return null;
  //       }

  //       const { x, y, w, h } = task;

  //       return (
  //         // <GridStackItem key={task.id} id={task.id} position={{ x, y, w, h }}>
  //         //   <Task task={task} />
  //         // </GridStackItem>
  //       );
  //     })}
  //   </GridStack>
  // );
};

export { ScheduleGrid };
