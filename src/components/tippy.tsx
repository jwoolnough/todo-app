import BaseTippy, { type TippyProps } from "@tippyjs/react";
import { forwardRef, useEffect, useState } from "react";
import "tippy.js/dist/tippy.css";

import { clsxm } from "@/utils/clsxm";

const Tippy = forwardRef<HTMLElement, TippyProps>(
  ({ className, ...rest }, ref) => {
    // This is horrible and a pain just to get tippy fonts to work - either need to
    // switch to app router or stop using next/font to load fonts
    const [appElement, setAppElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
      setAppElement(document.getElementById("app"));
    }, []);

    return (
      <BaseTippy
        className={clsxm(
          "border bg-slate-700 text-xs [&>.tippy-arrow]:text-slate-700",
          className,
        )}
        {...(appElement && { appendTo: appElement })}
        {...rest}
        ref={ref}
      />
    );
  },
);

Tippy.displayName = "Tippy";

export { Tippy };
