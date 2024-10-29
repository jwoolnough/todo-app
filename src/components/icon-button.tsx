"use client";

import {
  type TooltipContentProps,
  type TooltipProps,
} from "@radix-ui/react-tooltip";
import { type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "~/utils";

import { Button, type ButtonProps, type buttonVariants } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Wrap } from "./wrap";

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

export { IconButton };
