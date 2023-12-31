import { forwardRef, useState } from "react";
import { BsCheck } from "react-icons/bs";

import { clsxm } from "@/utils/clsxm";

type CheckProps = React.ComponentProps<"input">;

const Check = forwardRef<HTMLInputElement, CheckProps>(
  ({ checked, disabled, className, onChange, ...rest }, ref) => {
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);

    return (
      <span
        className={clsxm(
          "relative inline-block h-4 w-4 rounded-sm border-2 border-slate-700 transition",
          isChecked
            ? "border-transparent bg-green-500 focus-within:ring-2"
            : "focus-within:border-green-200 hover:border-slate-400",
          disabled &&
            "focus-within:border-slate-700 focus-within:ring-0 hover:border-slate-700",
          className,
        )}
      >
        <BsCheck
          className={clsxm(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 text-white opacity-0 transition",
            isChecked && "scale-1 opacity-100",
          )}
          size={22}
        />
        <input
          ref={ref}
          type="checkbox"
          className={clsxm(
            "absolute -inset-0.5 cursor-pointer opacity-0",
            disabled && "pointer-events-none",
          )}
          checked={isChecked}
          disabled={disabled}
          onChange={(e) => {
            setIsChecked(!isChecked);
            onChange?.(e);
          }}
          {...rest}
        />
      </span>
    );
  },
);

Check.displayName = "Check";

export { Check };
