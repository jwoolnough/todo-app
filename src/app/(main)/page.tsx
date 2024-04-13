import { type Metadata } from "next";

import { Header } from "~/features/layout";
import { ScheduleSidebar } from "~/features/schedule";

export const metadata: Metadata = {
  title: "Schedule",
};

export default function Index() {
  return (
    <div className="grid md:grid-cols-[15rem,minmax(0,1fr)] md:bg-navy-900">
      <ScheduleSidebar />

      <div className="flex flex-col">
        <Header />

        <div className="grow bg-navy-950 p-6 md:rounded-tl-xl">
          <p>The stuff</p>
        </div>
      </div>
    </div>
  );
}
