import { type Metadata } from "next";

import { HydrateClient, api } from "~/trpc/server";

import { Schedule, ScheduleHeader, ScheduleSidebar } from "~/features/schedule";
import { ScheduleDayPicker } from "~/features/schedule/day-picker";

export const metadata: Metadata = {
  title: "Schedule",
};

export default async function SchedulePage() {
  await api.taskList.getAll.prefetch();

  return (
    // TODO: Split out into Layout components for reusable styling
    <HydrateClient>
      <div className="grid bg-navy-900 md:grid-cols-[15rem,minmax(0,1fr)]">
        <ScheduleSidebar />

        <div className="flex h-screen flex-col">
          <ScheduleHeader />

          <div className="grow snap-x snap-mandatory overflow-auto rounded-tl-xl bg-navy-950 max-md:max-w-[100vw]">
            <ScheduleDayPicker />

            <Schedule />
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
