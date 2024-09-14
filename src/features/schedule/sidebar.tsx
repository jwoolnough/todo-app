import { MdDragIndicator } from "react-icons/md";

import { GridStack, GridStackItem } from "~/components/gridstack";

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

const ScheduleSidebar = () => {
  return (
    <Sidebar className="flex flex-col pb-3 pt-5">
      <h2>Tasks</h2>

      {/* TODO: Record accordion state in localStorage for seamless state on refresh */}
      <Accordion
        type="multiple"
        className="mt-6 flex flex-1 flex-col"
        defaultValue={["list-0"]}
      >
        {["This week", "This month", "At some point"].map((period, i) => (
          <AccordionItem
            value={`list-${i}`}
            key={i}
            className={cn(i === 2 && "border-b-0")}
          >
            <AccordionTrigger className="group">
              <span className="flex flex-1 items-center gap-2">
                {period} <Count count={2} />
                <MdDragIndicator
                  size={18}
                  className="ml-auto cursor-grab text-navy-300 opacity-0 transition active:cursor-grabbing group-focus-within:opacity-100 group-hover:opacity-100"
                />
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
                <GridStackItem position={{ x: 0, y: 0 }}>
                  <Task title="Doctor's appointment" />
                </GridStackItem>
                <GridStackItem position={{ x: 0, y: 1 }}>
                  <Task title="Tidy office" />
                </GridStackItem>
                <GridStackItem position={{ x: 0, y: 2 }}>
                  <Task title="Return package" />
                </GridStackItem>
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
