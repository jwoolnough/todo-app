import { clsxm } from "@/utils/clsxm";

type CellProps = WithChildren & {
  className?: string;
};

const Cell = ({ children, className }: CellProps) => {
  return (
    <div className={clsxm("border-t py-1 max-sm:pr-6 sm:px-1", className)}>
      {children}
    </div>
  );
};

export { Cell };
