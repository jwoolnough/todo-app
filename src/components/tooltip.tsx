"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { forwardRef } from "react";

import { cn } from "~/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(
  (
    { className, sideOffset = 4, collisionPadding = 4, children, ...props },
    ref,
  ) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      className={cn(
        "z-50 rounded-lg bg-navy-500 px-3 py-1 text-sm text-navy-100 drop-shadow-md duration-300 animate-in fade-in-0 data-[state=closed]:duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[side=bottom]:slide-in-from-top-3 data-[side=left]:slide-in-from-right-3 data-[side=right]:slide-in-from-left-3 data-[side=top]:slide-in-from-bottom-3",
        className,
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.TooltipArrow className="fill-navy-500" />
    </TooltipPrimitive.Content>
  ),
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
