"use client";

import { forwardRef } from "react";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";

import { cn } from "~/utils";

import { Task } from "../task";
import { DayHeader } from "./day-header";
import { TimeSidebar } from "./time-sidebar";

const GridLayout = WidthProvider(ReactGridLayout);

const GridItem = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("[&:not(.react-draggable-dragging)]:transition", className)}
    {...props}
  />
));
GridItem.displayName = "GridItem";

const Schedule = () => {
  const layout = [
    // i: task.id, x: date mapped to weekDay index, y: time mapped to hour index, w: 1, h: task.size
    { i: "a", x: 0, y: 0, w: 1, h: 1, title: "Take car to MOT" },
    { i: "b", x: 0, y: 1, w: 1, h: 1, title: "Hoover" },
    { i: "c", x: 1, y: 1, w: 1, h: 6, title: "Doctor's appointment" },
    { i: "d", x: 1, y: 7, w: 1, h: 1, title: "Lunch with Pete" },
    { i: "e", x: 1, y: 11, w: 1, h: 5, title: "Work on app" },
  ];

  return (
    <div className="relative grid w-min min-w-full grid-cols-[min-content_repeat(7,minmax(9.375rem,1fr))_1rem] grid-rows-[min-content_repeat(32,2rem)_1rem] gap-[var(--gap)] [--gap:0.3125rem]">
      <DayHeader />

      <TimeSidebar />

      {Array.from({ length: 16 }, (_, i) => (
        <div
          key={i}
          className={cn(
            "relative col-start-2 col-end-[-1] row-span-2 ml-[calc(var(--gap)*-1)] after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:border-b",
            i !== 3 && i !== 9 && "after:border-navy-300/10",
          )}
        ></div>
      ))}

      <GridLayout
        className="absolute inset-0 col-start-2 col-end-[span_7] row-start-2 row-end-[span_32]"
        cols={7}
        layout={layout}
        rowHeight={32}
        verticalCompact={false}
        margin={[5, 5]}
        maxRows={32}
        // isBounded - awaiting bugfix, see GH issues
        containerPadding={[0, 0]}
      >
        {layout.map(({ i, title }) => (
          <GridItem key={i}>
            <Task title={title} className="h-full" />
          </GridItem>
        ))}
      </GridLayout>
    </div>
  );
};

export { Schedule };
