"use client";

import { useState } from "react";
import { MdDragIndicator } from "react-icons/md";

import {
  GridStackProvider,
  GridStackRender,
  GridStackRenderProvider,
} from "~/components/gridstack";

import { type RouterOutputs, api } from "~/trpc/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Count,
} from "~/components";
import { cn } from "~/utils";

import { Sidebar } from "../layout";
import { Task } from "../task";
import { AddSidebarTask } from "./add-sidebar-task";

type SidebarTaskListProps = {
  taskList: RouterOutputs["taskList"]["getAll"][number];
};

const SidebarTaskList = ({ taskList }: SidebarTaskListProps) => {
  const [initialOptions] = useState({
    column: 1,
    margin: 0,
    marginTop: 4,
    cellHeight: 36,
    acceptWidgets: true,
    disableResize: true,
    children: taskList.tasks.map((task, y) => ({
      x: 0,
      y,
      id: task.id,
      content: JSON.stringify({
        name: "Task",
        props: { task, hideDescription: true },
      }),
    })),
  });

  return (
    <GridStackProvider initialOptions={initialOptions}>
      <GridStackRenderProvider>
        <GridStackRender componentMap={{ Task }} />
      </GridStackRenderProvider>
      <AddSidebarTask taskListId={taskList.id} />
    </GridStackProvider>
  );
};

const ScheduleSidebar = () => {
  const { data: taskLists } = api.taskList.getAll.useQuery();

  return (
    <Sidebar className="flex max-h-screen flex-col overflow-auto pb-3 pt-5">
      <h2>Tasks</h2>

      {/* TODO: Record accordion state in localStorage for seamless state on refresh */}
      <Accordion
        type="multiple"
        className="mt-6 flex flex-1 flex-col"
        defaultValue={taskLists?.[0] ? [`list-${taskLists[0].id}`] : undefined}
      >
        {taskLists?.map((taskList, i) => (
          <AccordionItem
            value={`list-${taskList.id}`}
            key={taskList.id}
            className={cn(i === taskLists.length - 1 && "border-b-0")}
          >
            <AccordionTrigger className="group">
              <span className="flex flex-1 items-center gap-2">
                {taskList.name} <Count count={taskList.tasks.length} />
                {/* TODO: Implement drag handle */}
                {false && (
                  <MdDragIndicator
                    size={18}
                    className="ml-auto cursor-grab text-navy-300 opacity-0 transition active:cursor-grabbing group-focus-within:opacity-100 group-hover:opacity-100"
                  />
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <SidebarTaskList taskList={taskList} />
            </AccordionContent>
          </AccordionItem>
        ))}

        {/* TODO: Implement Stats */}
        {false && (
          <AccordionItem className="mt-auto border-b-0 border-t" value="stats">
            <AccordionTrigger>Stats</AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </Sidebar>
  );
};

export { ScheduleSidebar };
