"use client";

import { forwardRef } from "react";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";

import { cn } from "~/utils";

import { Task } from "../task";
import { AddTask } from "./add-task";
import { DayHeader } from "./day-header";
import { PastDays } from "./past-days";
import { TimeBar } from "./time-indicator";
import { TimeSidebar } from "./time-sidebar";

const GridLayout = WidthProvider(ReactGridLayout);

const GridItem = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "[&.react-draggable-dragging]:z-10 [&:not(.react-draggable-dragging)]:transition",
      className,
    )}
    {...props}
  />
));
GridItem.displayName = "GridItem";

const Schedule = () => {
  const layout = [
    // i: task.id, x: date mapped to weekDay index, y: time mapped to hour index, w: 1, h: task.size
    { i: "a", x: 0, y: 0, w: 1, h: 1, title: "Take car to MOT" },
    { i: "b", x: 0, y: 1, w: 1, h: 1, title: "Hoover" },
    {
      i: "c",
      x: 0,
      y: 8,
      w: 1,
      h: 6,
      title: "Meeting with Sam",
      description: "Lorem ipsum dolor sit amet consecteteur adipiscing elit",
    },
    {
      i: "d",
      x: 0,
      y: 18,
      w: 1,
      h: 4,
      title: "Run",
      description: "2mi WU, 4mi tempo, 2mi CD",
    },
    {
      i: "e",
      x: 1,
      y: 3,
      w: 1,
      h: 6,
      title: "Doctor's appointment",
      description: "Parking available on Rouen Road",
      completed: true,
    },
    { i: "f", x: 1, y: 9, w: 1, h: 1, title: "Lunch with Pete" },
    {
      i: "g",
      x: 1,
      y: 11,
      w: 1,
      h: 5,
      title: "Work on app",
      description: "Complete design V2",
      completed: true,
    },
    { i: "h", x: 2, y: 1, w: 1, h: 1, title: "Take out bins" },
    {
      i: "i",
      x: 2,
      y: 12,
      w: 1,
      h: 6,
      title: "Michael's funeral",
      description: "Ellough Crematorium",
    },
    {
      i: "j",
      x: 2,
      y: 18,
      w: 1,
      h: 6,
      title: "Wake at the Angel",
      description: "Angel, Halesworth. Consider transport?",
    },
    {
      i: "l",
      x: 4,
      y: 6,
      w: 1,
      h: 2,
      title: "Run",
      description: "5K easy",
    },
    {
      i: "m",
      x: 4,
      y: 20,
      w: 1,
      h: 6,
      title: "Band practice",
      description: "Plug Studios, 6pm-9pm",
    },
    {
      i: "n",
      x: 5,
      y: 6,
      w: 1,
      h: 2,
      title: "Run",
      description: "5K easy",
    },
    {
      i: "o",
      x: 5,
      y: 8,
      w: 1,
      h: 12,
      title: "Pub crawl",
      description: "Dinner at Haggle at 6pm",
    },
  ];

  return (
    <div className="relative grid w-min min-w-full grid-cols-[3rem_repeat(7,minmax(9.375rem,1fr))_1rem] grid-rows-[min-content_repeat(32,2rem)_1rem] gap-[var(--gap)] [--gap:0.3125rem]">
      <PastDays />

      <DayHeader />

      <TimeSidebar />

      {Array.from({ length: 16 }, (_, i) => (
        <div
          key={i}
          className={cn(
            "relative col-start-2 col-end-[-1] row-span-2 ml-[calc(var(--gap)*-1)] after:absolute after:bottom-[-3px] after:left-0 after:right-0 after:border-b after:border-opaque",
            i !== 3 && i !== 9 && "after:border-light-opaque",
          )}
        ></div>
      ))}

      <TimeBar />

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
        {layout.map(({ i, title, description, completed }) => (
          <GridItem key={i}>
            <Task
              title={title}
              description={description}
              defaultChecked={completed}
              className="h-full"
            />
          </GridItem>
        ))}
      </GridLayout>

      <AddTask />
    </div>
  );
};

export { Schedule };
