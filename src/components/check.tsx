import { forwardRef, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";

import { clsxm } from "@/utils/clsxm";

type CheckProps = React.ComponentProps<"input">;

const Check = forwardRef<HTMLInputElement, CheckProps>(
  ({ checked, className, ...rest }, ref) => {
    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);

    return (
      <label
        className={clsxm(
          "relative inline-block h-4 w-4 rounded-sm border-2 border-slate-700 transition",
          isChecked
            ? "border-transparent bg-green-500 focus-within:ring-2"
            : "focus-within:border-green-200",
          className,
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className="absolute inset-0 opacity-0"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          {...rest}
        />
        <BsCheck
          className={clsxm(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 text-white opacity-0 transition",
            isChecked && "scale-1 opacity-100",
          )}
          size={22}
        />
      </label>
    );
  },
);

Check.displayName = "Check";

export { Check };
