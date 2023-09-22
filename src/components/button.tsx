import { clsxm } from "@/utils/clsxm";
import { forwardRefWithAs } from "@/utils/component-with-as";

type ButtonProps = {
  // className?: string;
};

const Button = forwardRefWithAs<"button", ButtonProps>(
  ({ as, className, children, ...rest }, ref) => {
    const Component = as ?? "button";

    return (
      <Component
        ref={ref}
        className={clsxm(
          "inline-flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-100 hover:text-slate-950",
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = "Count";

export { Button };
