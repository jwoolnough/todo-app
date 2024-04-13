"use client";

// import { AnimatePresence, motion } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import { usePathname } from "next/navigation";
import { useContext, useRef } from "react";

import { Nav } from "~/features/layout";

export const FrozenRouter = (props: React.PropsWithChildren) => {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();

  return (
    <div className="grid h-screen md:grid-cols-[min-content_minmax(0,1fr)]">
      <Nav />

      <div>{children}</div>

      {/* <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence> */}
    </div>
  );
}
