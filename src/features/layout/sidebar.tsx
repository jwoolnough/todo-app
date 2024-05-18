"use client";

import { motion, useDragControls } from "framer-motion";

import { cn } from "~/utils";

type SidebarProps = React.PropsWithChildren<{
  className?: string;
}>;

// TODO: Refactor this to use context and have the whole app drag over (including nav)
const Sidebar = ({ className, children }: SidebarProps) => {
  const dragControls = useDragControls();

  const startDrag = (e: React.PointerEvent) => {
    dragControls.start(e);
  };

  return (
    <motion.div
      drag="x"
      dragControls={dragControls}
      dragConstraints={{ left: 0, right: 240 }}
      dragListener={false}
      dragElastic={false}
      className={cn(
        "px-6 py-4 max-md:fixed max-md:bottom-0 max-md:right-full max-md:top-0 max-md:w-[15rem] max-md:bg-navy-900 max-md:shadow-lg md:!transform-none md:border-l",
        className,
      )}
    >
      {children}

      <div
        className="absolute bottom-0 left-full top-0 w-12 -translate-x-1/2 md:hidden"
        onPointerDown={startDrag}
      ></div>
    </motion.div>
  );
};

export { Sidebar };
