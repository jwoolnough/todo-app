import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { Nav } from "./nav";

const Layout = ({ children }: WithChildren) => {
  const pathname = usePathname();
  return (
    <div className="grid min-h-[100dvh] max-sm:grid-rows-[minmax(0,1fr)_min-content] sm:grid-cols-[3.75rem_1fr] sm:gap-2">
      <Nav />

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className="flex flex-col"
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
