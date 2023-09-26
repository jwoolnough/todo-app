import { AnimatePresence, motion } from "framer-motion";

import { clsxm } from "@/utils/clsxm";
import { type ComponentWithAs } from "@/utils/component-with-as";

type CountProps = {
  count: number;
  className?: string;
};

const BaseCount: ComponentWithAs<"span", CountProps> = ({
  as,
  className,
  count,
  ...rest
}) => {
  const Component = as ?? "span";

  return (
    <Component
      className={clsxm(
        "inline-block min-w-[1rem] rounded-full bg-green-500 px-1 text-center text-xs font-bold text-white",
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
        <BaseCount
          as={motion.span}
          count={count}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          {...props}
        />
      )}
    </AnimatePresence>
  );
};

export { Count };
