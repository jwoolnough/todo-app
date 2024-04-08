"use client";

import { Slot } from "@radix-ui/react-slot";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "~/utils";

const formatCount = (count: number) => (count > 99 ? "99+" : String(count));

type CountProps = React.PropsWithChildren<{
  count: number;
  className?: string;
  asChild?: boolean;
}>;

const BaseCount = ({
  asChild = false,
  className,
  children,
  ...rest
}: CountProps) => {
  const Component = asChild ? Slot : "span";

  return (
    <Component
      className={cn(
        "font-bold text-black inline-block min-w-3.5 rounded-full bg-green-500 px-0.5 text-center text-sm leading-[0.875rem] shadow-neon ",
        className,
      )}
      {...rest}
    >
      {children}
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
          >
            {formatCount(count)}
          </motion.span>
        </BaseCount>
      )}
    </AnimatePresence>
  );
};

export { Count };
