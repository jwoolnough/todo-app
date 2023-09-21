import { forwardRef } from "react";

import { clsxm } from "@/utils/clsxm";

import type {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@/types/polymorphic-component";

type CountProps = {
  count: number;
  className?: string;
};

const Count = forwardRef(
  <C extends React.ElementType = "span">(
    { as, className, count }: PolymorphicComponentPropsWithRef<C, CountProps>,
    ref: PolymorphicRef<C>,
  ) => {
    const Component = as ?? "span";

    return (
      <Component
        ref={ref}
        className={clsxm(
          "inline-block min-w-[1rem] rounded-full bg-green-500 px-1 text-center text-xs font-bold text-white",
          className,
        )}
      >
        {count > 99 ? "99+" : count}
      </Component>
    );
  },
);

Count.displayName = "Count";

export { Count };
