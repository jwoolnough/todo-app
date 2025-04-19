"use client";

import { MdDragIndicator } from "react-icons/md";

import { cn } from "~/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Count,
} from "~/components";

import { type RouterOutputs, api } from "~/trpc/react";

import { Sidebar } from "../layout";
import { Task } from "../task";
import { AddSidebarTask } from "./add-sidebar-task";
import { useUpdateSidebarTask } from "./hooks/use-update-sidebar-task";

type TaskListProps = RouterOutputs["taskList"]["getAll"][number] & {
  className?: string;
};

const TaskList = ({ id, name, tasks, className }: TaskListProps) => {
  const updateTask = useUpdateSidebarTask(id);

  return (
    <AccordionItem value={`list-${id}`} key={id} className={className}>
      <AccordionTrigger className="group">
        <span className="flex flex-1 items-center gap-2">
          {name} <Count count={tasks.length} />
          {/* TODO: Implement drag handle */}
          {true && (
            <MdDragIndicator
              size={18}
              className="ml-auto cursor-grab text-navy-300 opacity-0 transition active:cursor-grabbing group-focus-within:opacity-100 group-hover:opacity-100"
            />
          )}
        </span>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-1">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onSubmit={async (values) => {
              await updateTask.mutateAsync({ id: task.id, ...values });
            }}
            onCompletionChange={async (completed) => {
              await updateTask.mutateAsync({
                id: task.id,
                completed,
                completedAt: completed ? new Date() : null,
              });
            }}
            hideDescription
          />
        ))}
        <AddSidebarTask taskListId={id} />
      </AccordionContent>
    </AccordionItem>
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
          <TaskList
            className={cn(i === taskLists.length - 1 && "border-b-0")}
            key={taskList.id}
            {...taskList}
          />
        ))}

        {/* TODO: Implement Stats */}
        {true && (
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
