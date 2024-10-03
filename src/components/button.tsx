import { Slot } from "@radix-ui/react-slot";
import {
  type TooltipContentProps,
  type TooltipProps,
} from "@radix-ui/react-tooltip";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "~/utils";

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Wrap } from "./wrap";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-green-500 text-navy-950 hover:bg-white hover:[--neon-color:#fff]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-input bg-background hover:bg-accent hover:text-accent-foreground border",
        secondary: "bg-navy-500 text-white hover:bg-white hover:text-navy-950",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "rounded-lg text-navy-300 hover:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-7 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, type, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={!asChild && type === undefined ? "button" : type}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

type RenderTooltip = (props: {
  children?: React.ReactNode;
  tooltipProps?: Omit<TooltipProps, "ref">;
  tooltipContentProps?: Omit<TooltipContentProps, "ref">;
  label: string;
}) => React.ReactNode;

type IconButtonProps = ButtonProps & {
  label: string;
  tooltipProps?: Omit<TooltipProps, "ref">;
  tooltipContentProps?: Omit<TooltipContentProps, "ref">;
  withTooltip?: boolean;
  renderTooltip?: RenderTooltip;
};

const defaultRenderTooltip: RenderTooltip = ({
  children,
  tooltipProps,
  tooltipContentProps,
  label,
}) => (
  <Tooltip {...tooltipProps}>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent {...tooltipContentProps}>{label}</TooltipContent>
  </Tooltip>
);

const ICON_BUTTON_SIZE_CLASSNAMES: Record<
  NonNullable<VariantProps<typeof buttonVariants>["size"]>,
  string
> = {
  default: "size-9",
  sm: "size-7",
  lg: "size-12",
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      label,
      withTooltip = true,
      tooltipProps,
      tooltipContentProps,
      renderTooltip = defaultRenderTooltip,
      className,
      size,
      ...props
    },
    ref,
  ) => {
    return (
      <Wrap
        if={withTooltip}
        wrapper={(children) =>
          renderTooltip({ children, label, tooltipProps, tooltipContentProps })
        }
      >
        <Button
          ref={ref}
          aria-label={label}
          className={cn(
            "p-0",
            ICON_BUTTON_SIZE_CLASSNAMES[size ?? "default"],
            className,
          )}
          size={size}
          {...props}
        />
      </Wrap>
    );
  },
);
IconButton.displayName = "IconButton";

export { Button, buttonVariants, IconButton };
