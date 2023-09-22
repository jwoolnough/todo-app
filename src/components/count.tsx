import { clsxm } from "@/utils/clsxm";
import { forwardRefWithAs } from "@/utils/component-with-as";

type CountProps = {
  count: number;
  className?: string;
};

const Count = forwardRefWithAs<"span", CountProps>(
  ({ as, className, count, ...rest }, ref) => {
    const Component = as ?? "span";

    return (
      <Component
        ref={ref}
        className={clsxm(
          "inline-block min-w-[1rem] rounded-full bg-green-500 px-1 text-center text-xs font-bold text-white",
          className,
        )}
        {...rest}
      >
        {count > 99 ? "99+" : count}
      </Component>
    );
  },
);

Count.displayName = "Count";

export { Count };
