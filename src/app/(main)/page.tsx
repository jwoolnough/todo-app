import { type Metadata } from "next";

import { ScheduleHeader, ScheduleSidebar } from "~/features/schedule";

export const metadata: Metadata = {
  title: "Schedule",
};

export default function Schedule() {
  return (
    <div className="grid bg-navy-900 md:grid-cols-[15rem,minmax(0,1fr)]">
      <ScheduleSidebar />

      <div className="flex flex-col">
        <ScheduleHeader />

        <div className="grow rounded-tl-xl bg-navy-950 p-6"></div>
      </div>
    </div>
  );
}
