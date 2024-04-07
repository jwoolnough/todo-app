"use client";

import { Slot } from "@radix-ui/react-slot";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "~/utils";

type CountProps = React.PropsWithChildren<{
  count: number;
  className?: string;
  asChild?: boolean;
}>;

const BaseCount = ({
  asChild = false,
  className,
  count,
  ...rest
}: CountProps) => {
  const Component = asChild ? Slot : "span";

  return (
    <Component
      className={cn(
        "font-bold inline-block min-w-[1rem] rounded-full bg-green-500 px-1 text-center text-xs text-white",
        className,
      )}
      {...rest}
    >
      {count > 99 ? "99+" : count}
    </Component>
  );
};

const Count = ({ count, ...props }: CountProps) => {
  return (
    <AnimatePresence>
      {count > 0 && (
        <BaseCount count={count} asChild {...props}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </BaseCount>
      )}
    </AnimatePresence>
  );
};

export { Count };
