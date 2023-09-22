import { clsxm } from "@/utils/clsxm";
import { forwardRefWithAs } from "@/utils/component-with-as";

type BoxProps = {
  //
};

const Box = forwardRefWithAs<"div", BoxProps>(
  ({ as, className, children, ...rest }, ref) => {
    const Component = as ?? "div";

    return (
      <Component
        ref={ref}
        className={clsxm("rounded-xl border bg-slate-900 p-6", className)}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Box.displayName = "Box";

export { Box };
