import { clsxm } from "@/utils/clsxm";

type CellProps = WithChildren & {
  className?: string;
};

const Cell = ({ children, className }: CellProps) => {
  return (
    <div
      className={clsxm(
        "border-t py-1 sm:px-1 max-sm:[&:not(:last-child)]:pr-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export { Cell };
