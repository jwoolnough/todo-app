import BaseTippy, { type TippyProps } from "@tippyjs/react";
import { forwardRef } from "react";
import "tippy.js/animations/shift-away.css";
import "tippy.js/dist/tippy.css";

import { clsxm } from "@/utils/clsxm";

const Tippy = forwardRef<HTMLElement, TippyProps>(
  ({ className, ...rest }, ref) => (
    <BaseTippy
      ref={ref}
      className={clsxm(
        "border bg-slate-700 text-xs [&>.tippy-arrow]:text-slate-700",
        className,
      )}
      animation="shift-away"
      {...rest}
    />
  ),
);

Tippy.displayName = "Tippy";

export { Tippy };
