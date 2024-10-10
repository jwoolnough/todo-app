import { MdDragIndicator } from "react-icons/md";

import { GridStack, GridStackItem } from "~/components/gridstack";

import { api } from "~/trpc/server";

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

const ScheduleSidebar = async () => {
  const taskLists = await api.taskList.getAll();

  return (
    <Sidebar className="flex flex-col pb-3 pt-5">
      <h2>Tasks</h2>

      {/* TODO: Record accordion state in localStorage for seamless state on refresh */}
      <Accordion
        type="multiple"
        className="mt-6 flex flex-1 flex-col"
        defaultValue={taskLists[0] ? [`list-${taskLists[0].id}`] : undefined}
      >
        {taskLists.map((taskList, i) => (
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
              <GridStack
                options={{
                  column: 1,
                  margin: 0,
                  marginTop: 4,
                  cellHeight: 36,
                  acceptWidgets: true,
                  disableResize: true,
                }}
              >
                {taskList.tasks.map((task, y) => (
                  <GridStackItem position={{ x: 0, y }} key={task.id}>
                    <Task title={task.title} />
                  </GridStackItem>
                ))}
              </GridStack>
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
