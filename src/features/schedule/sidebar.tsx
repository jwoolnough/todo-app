import { MdDragIndicator } from "react-icons/md";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Count,
} from "~/components";

import { Sidebar } from "../layout";

const ScheduleSidebar = () => {
  return (
    <Sidebar className="flex flex-col">
      <h2>Tasks</h2>

      <Accordion type="multiple" className="mt-6 flex flex-1 flex-col">
        {["This week", "This month", "At some point"].map((period, i) => (
          <AccordionItem value={`list-${i}`} key={i}>
            <AccordionTrigger className="group">
              <span className="flex flex-1 items-center gap-2">
                {period} <Count count={2} />
                <MdDragIndicator
                  size={18}
                  className="ml-auto text-navy-300 opacity-0 transition group-focus-within:opacity-100 group-hover:opacity-100"
                />
              </span>
            </AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        ))}

        <AccordionItem className="mt-auto border-b-0 border-t" value="stats">
          <AccordionTrigger>Stats</AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>
    </Sidebar>
  );
};

export { ScheduleSidebar };
