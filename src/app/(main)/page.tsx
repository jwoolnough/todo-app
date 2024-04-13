import { type Metadata } from "next";

import { Header } from "~/features/layout";

export const metadata: Metadata = {
  title: "Schedule",
};

export default function Index() {
  return (
    <div className="md:bg-navy-900">
      <Header />

      <div className="bg-navy-950 p-6 md:rounded-tl-xl">
        <p>The stuff</p>
      </div>
    </div>
  );
}
