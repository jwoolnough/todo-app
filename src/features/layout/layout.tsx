import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { TaskPanel } from "../task/panel";
import { Nav } from "./nav";

const Layout = ({ children }: WithChildren) => {
  const pathname = usePathname();
  return (
    <div className="grid min-h-[100dvh] max-sm:grid-rows-[minmax(0,1fr)_min-content] sm:grid-cols-[3.75rem_16.25rem_minmax(0,1fr)] sm:grid-rows-[min-content_minmax(0,1fr)] sm:gap-x-2">
      <Nav />

      <TaskPanel />

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className="flex grid-rows-[subgrid] flex-col sm:row-span-full sm:grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export { Layout };
