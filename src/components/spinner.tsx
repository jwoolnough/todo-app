import { clsxm } from "@/utils/clsxm";

type SpinnerProps = {
  className?: string;
};

const Spinner = ({ className }: SpinnerProps) => (
  <div
    className={clsxm(
      "border-3 h-6 w-6 animate-spin rounded-full border-slate-700 border-b-slate-400",
      className,
    )}
  />
);

export { Spinner };
