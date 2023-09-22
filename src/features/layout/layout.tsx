import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FiPlus } from "react-icons/fi";

import { IconButton } from "@/components/button";

import { Nav } from "./nav";

const Layout = ({ children }: WithChildren) => {
  const pathname = usePathname();
  return (
    <div className="grid min-h-[100dvh] max-sm:grid-rows-[minmax(0,1fr)_min-content] sm:grid-cols-[3.75rem_16.25rem_minmax(0,1fr)] sm:grid-rows-[min-content_minmax(0,1fr)] sm:gap-x-2">
      <Nav />

      <aside className="grid grid-rows-[subgrid] max-sm:hidden sm:row-span-full">
        <div className="flex items-center gap-4 px-4 py-6">
          <h3 className="text-lg font-bold text-white">Tasks</h3>
          <IconButton variant="secondary" size="sm" label="Add task">
            <FiPlus size={18} />
          </IconButton>
        </div>

        <div>
          {["This week", "This month", "At some point"].map((category) => (
            <div
              className="mb-2 rounded-xl border bg-slate-900 px-4 py-3"
              key={category}
            >
              {category}
            </div>
          ))}
        </div>
      </aside>

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
