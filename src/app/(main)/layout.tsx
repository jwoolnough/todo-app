import { Nav } from "~/features/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen md:grid-cols-[min-content_minmax(0,1fr)]">
      <Nav />

      <main>{children}</main>
    </div>
  );
}
