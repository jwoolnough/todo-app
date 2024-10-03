import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";

import { Nav } from "~/features/layout";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="grid h-screen md:grid-cols-[min-content_minmax(0,1fr)]">
      <Nav />

      {children}
    </div>
  );
}
