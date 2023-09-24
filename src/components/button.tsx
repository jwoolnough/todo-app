import type { TippyProps } from "@tippyjs/react";

import { clsxm } from "@/utils/clsxm";
import { forwardRefWithAs } from "@/utils/component-with-as";

import { Tippy } from "./tippy";
import { Wrap } from "./wrap";

type ButtonVariants = "primary" | "secondary" | "link";
type ButtonSizes = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSizes;
};

const VARIANT_CLASSES: Record<ButtonVariants, string> = {
  primary: "bg-green-500 text-white hover:bg-green-100 hover:text-slate-950",
  secondary:
    "bg-slate-700 text-slate-400 hover:bg-green-100 hover:text-slate-950",
  link: "text-slate-400 hover:text-white",
};

const SIZE_CLASSES: Record<ButtonSizes, string> = {
  sm: "px-3 py-2 text-sm/4",
  md: "px-4 py-2",
  lg: "px-6 py-4",
};

const Button = forwardRefWithAs<"button", ButtonProps>(
  (
    { as, variant = "primary", size = "md", className, children, ...rest },
    ref,
  ) => {
    const Component = as ?? "button";

    return (
      <Component
        ref={ref}
        className={clsxm(
          "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-medium",
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          variant === "link" && "p-0",
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = "Button";

type IconButtonProps = ButtonProps & {
  label: string;
  tippyProps?: Omit<TippyProps, "ref">;
  withTippy?: boolean;
};

const ICON_SIZE_CLASSES: Record<ButtonSizes, string> = {
  sm: "w-5 h-5 rounded-sm",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

const IconButton = forwardRefWithAs<"button", IconButtonProps>(
  (
    {
      tippyProps,
      as = "button",
      size = "md",
      className,
      withTippy = true,
      label,
      ...rest
    },
    ref,
  ) => {
    return (
      <Wrap
        if={withTippy}
        wrapper={(children) => (
          <Tippy content={label} {...tippyProps}>
            {children as React.ReactElement}
          </Tippy>
        )}
      >
        <Button
          ref={ref}
          as={as}
          className={clsxm("p-0", ICON_SIZE_CLASSES[size], className)}
          aria-label={label}
          {...rest}
        />
      </Wrap>
    );
  },
);

IconButton.displayName = "IconButton";

export { Button, IconButton };
