import { type Metadata } from "next";

import { HydrateClient } from "~/trpc/server";

import { Schedule, ScheduleHeader, ScheduleSidebar } from "~/features/schedule";

export const metadata: Metadata = {
  title: "Schedule",
};

export default async function SchedulePage() {
  // TODO: Fix
  // await Promise.all([
  //   api.taskList.getAll.prefetch,
  //   api.task.getByWeek.prefetch,
  // ]);

  return (
    // TODO: Split out into Layout components for reusable styling
    <HydrateClient>
      <div className="grid bg-navy-900 md:grid-cols-[15rem,minmax(0,1fr)]">
        <ScheduleSidebar />

        <div className="flex h-screen flex-col">
          <ScheduleHeader />

          <div className="grow snap-x snap-mandatory overflow-auto rounded-tl-xl bg-navy-950">
            <Schedule />
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
