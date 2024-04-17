import { MdDragIndicator } from "react-icons/md";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Count,
} from "~/components";

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
          <AccordionItem value={`list-${i}`} key={i}>
            <AccordionTrigger className="group">
              <span className="flex flex-1 items-center gap-2">
                {period} <Count count={2} />
                {false && (
                  <MdDragIndicator
                    size={18}
                    className="ml-auto cursor-grab text-navy-300 opacity-0 transition group-focus-within:opacity-100 group-hover:opacity-100"
                  />
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <Task
                title="Doctor's appointment"
                description="Parking available on Rouen Road"
              />
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
